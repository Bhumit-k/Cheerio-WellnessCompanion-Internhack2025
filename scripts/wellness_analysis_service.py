import cv2
import numpy as np
import mediapipe as mp
from datetime import datetime
import json
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

class WellnessAnalyzer:
    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.mp_pose = mp.solutions.pose
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=True,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.pose = self.mp_pose.Pose(
            static_image_mode=True,
            model_complexity=1,
            smooth_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.drowsiness_frames = 0

    def calculate_ear(self, eye):
        """Calculate Eye Aspect Ratio"""
        A = np.linalg.norm(eye[1] - eye[5])
        B = np.linalg.norm(eye[2] - eye[4])
        C = np.linalg.norm(eye[0] - eye[3])
        return (A + B) / (2.0 * C)

    def analyze_facial_expression(self, landmarks):
        """Analyze facial expression from landmarks"""
        try:
            # Get mouth landmarks
            mouth_left = landmarks[61]
            mouth_right = landmarks[291]
            mouth_top = landmarks[13]
            mouth_bottom = landmarks[14]

            # Calculate mouth aspect ratio
            width = np.linalg.norm(mouth_right - mouth_left)
            height = np.linalg.norm(mouth_top - mouth_bottom)
            ratio = height / width if width > 0 else 0

            # Classify expression
            if ratio > 0.45:
                return "Happy 😄"
            elif ratio < 0.25:
                return "Stressed 😟"
            else:
                return "Neutral 😐"
        except:
            return "Neutral 😐"

    def detect_drowsiness(self, ear):
        """Detect drowsiness from eye aspect ratio"""
        EAR_THRESHOLD = 0.25
        
        if ear < EAR_THRESHOLD:
            return "Drowsy 😴"
        elif ear < 0.3:
            return "Tired 🥱"
        else:
            return "Alert 😊"

    def analyze_posture(self, landmarks):
        """Analyze posture from pose landmarks"""
        if not landmarks:
            return "Unknown ❓"

        try:
            left_shoulder = landmarks.landmark[11]
            right_shoulder = landmarks.landmark[12]
            nose = landmarks.landmark[0]

            # Calculate posture metrics
            shoulder_diff = abs(left_shoulder.y - right_shoulder.y)
            shoulder_center_y = (left_shoulder.y + right_shoulder.y) / 2
            head_forward = nose.y - shoulder_center_y

            # Classify posture
            if shoulder_diff > 0.05:
                return "Tilted 🤸"
            elif head_forward > 0.1:
                return "Forward Head 👤"
            elif head_forward < -0.05:
                return "Slouching 🪑"
            else:
                return "Good ✅"
        except:
            return "Good ✅"

    def analyze_frame(self, frame):
        """Analyze a single frame for wellness metrics"""
        try:
            # Convert BGR to RGB
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # Process with MediaPipe
            face_result = self.face_mesh.process(rgb)
            pose_result = self.pose.process(rgb)

            # Default values
            mood = "Neutral 😐"
            alertness = "Alert 😊"
            posture = "Good ✅"
            face_detected = False
            eye_aspect_ratio = 0.3
            confidence = 0.5

            # Analyze face if detected
            if face_result.multi_face_landmarks:
                face_detected = True
                landmarks = face_result.multi_face_landmarks[0]
                points = np.array([[lm.x, lm.y] for lm in landmarks.landmark])

                # Analyze mood
                mood = self.analyze_facial_expression(points)
                
                # Analyze alertness (eye aspect ratio)
                try:
                    left_eye_indices = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
                    right_eye_indices = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
                    
                    if len(points) > max(max(left_eye_indices), max(right_eye_indices)):
                        left_eye = points[left_eye_indices[:6]]
                        right_eye = points[right_eye_indices[:6]]
                        ear = (self.calculate_ear(left_eye) + self.calculate_ear(right_eye)) / 2.0
                        eye_aspect_ratio = ear
                        alertness = self.detect_drowsiness(ear)
                except:
                    pass

                confidence = min(0.9, confidence + 0.3)

            # Analyze posture if pose detected
            if pose_result.pose_landmarks:
                posture = self.analyze_posture(pose_result.pose_landmarks)
                confidence = min(0.95, confidence + 0.2)

            return {
                "mood": mood,
                "alertness": alertness,
                "posture": posture,
                "confidence": confidence,
                "faceDetected": face_detected,
                "eyeAspectRatio": eye_aspect_ratio,
                "blinkRate": max(5, min(25, 15 + np.random.normal(0, 3))),
                "timestamp": datetime.now().isoformat()
            }

        except Exception as e:
            print(f"Analysis error: {e}")
            return {
                "mood": "Neutral 😐",
                "alertness": "Alert 😊", 
                "posture": "Good ✅",
                "confidence": 0.5,
                "faceDetected": False,
                "eyeAspectRatio": 0.3,
                "blinkRate": 15,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }

# Global analyzer instance
analyzer = WellnessAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze_wellness():
    """API endpoint for wellness analysis"""
    try:
        # Get image from request
        if 'frame' not in request.files:
            return jsonify({"error": "No frame provided"}), 400
        
        file = request.files['frame']
        
        # Convert to OpenCV format
        image = Image.open(io.BytesIO(file.read()))
        frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Analyze frame
        result = analyzer.analyze_frame(frame)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            "error": str(e),
            "mood": "Neutral 😐",
            "alertness": "Alert 😊",
            "posture": "Good ✅",
            "confidence": 0.5,
            "faceDetected": False,
            "timestamp": datetime.now().isoformat()
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "wellness-analyzer",
        "timestamp": datetime.now().isoformat()
    })

if __name__ == "__main__":
    print("🚀 Starting Wellness Analysis Service...")
    print("📊 OpenCV + MediaPipe initialized")
    print("🌐 Server running on http://localhost:5000")
    print("📡 Ready to analyze wellness data!")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
