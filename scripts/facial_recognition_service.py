import cv2
import numpy as np
import mediapipe as mp
from datetime import datetime

class WellnessAnalyzer:
    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.mp_pose = mp.solutions.pose
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.pose = self.mp_pose.Pose(
            static_image_mode=False,
            model_complexity=1,
            smooth_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.drowsiness_frames = 0

    def calculate_ear(self, eye):
        A = np.linalg.norm(eye[1] - eye[5])
        B = np.linalg.norm(eye[2] - eye[4])
        C = np.linalg.norm(eye[0] - eye[3])
        return (A + B) / (2.0 * C)

    def analyze_facial_expression(self, landmarks):
        mouth_left = landmarks[61]
        mouth_right = landmarks[291]
        mouth_top = landmarks[13]
        mouth_bottom = landmarks[14]

        width = np.linalg.norm(mouth_right - mouth_left)
        height = np.linalg.norm(mouth_top - mouth_bottom)
        ratio = height / width

        if ratio > 0.45:
            return "Happy 😄"
        elif ratio < 0.25:
            return "Stressed 😟"
        else:
            return "Neutral 😐"

    def detect_drowsiness(self, ear):
        EAR_THRESHOLD = 0.25
        FRAME_LIMIT = 20

        if ear < EAR_THRESHOLD:
            self.drowsiness_frames += 1
        else:
            self.drowsiness_frames = 0

        if self.drowsiness_frames >= FRAME_LIMIT:
            return "Drowsy 😴"
        elif ear < 0.3:
            return "Tired 🥱"
        else:
            return "Alert 😊"

    def analyze_posture(self, landmarks):
        if not landmarks:
            return "Unknown ❓"

        left_shoulder = landmarks.landmark[11]
        right_shoulder = landmarks.landmark[12]
        nose = landmarks.landmark[0]

        shoulder_diff = abs(left_shoulder.y - right_shoulder.y)
        shoulder_center_y = (left_shoulder.y + right_shoulder.y) / 2
        head_forward = nose.y - shoulder_center_y

        if shoulder_diff > 0.05:
            return "Tilted 🤸"
        elif head_forward > 0.1:
            return "Forward Head 👤"
        elif head_forward < -0.05:
            return "Slouching 🪑"
        else:
            return "Good ✅"

    def analyze_frame(self, frame):
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        face_result = self.face_mesh.process(rgb)
        pose_result = self.pose.process(rgb)

        mood = "Neutral 😐"
        alertness = "Alert 😊"
        posture = "Unknown ❓"

        if face_result.multi_face_landmarks:
            landmarks = face_result.multi_face_landmarks[0]
            points = np.array([[lm.x, lm.y] for lm in landmarks.landmark])

            mood = self.analyze_facial_expression(points)
            left_eye = points[33:42]
            right_eye = points[362:371]
            ear = (self.calculate_ear(left_eye) + self.calculate_ear(right_eye)) / 2.0
            alertness = self.detect_drowsiness(ear)

        if pose_result.pose_landmarks:
            posture = self.analyze_posture(pose_result.pose_landmarks)

        return {
            "mood": mood,
            "alertness": alertness,
            "posture": posture
        }

def main():
    analyzer = WellnessAnalyzer()
    cap = cv2.VideoCapture(0)

    print("🎥 Webcam started. Press 'q' to exit.")

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        result = analyzer.analyze_frame(frame)
        overlay_text = f"{result['mood']} | {result['alertness']} | {result['posture']}"

        # Draw overlay
        cv2.rectangle(frame, (0, 0), (frame.shape[1], 40), (0, 0, 0), -1)
        cv2.putText(frame, overlay_text, (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

        cv2.imshow("💡 Real-Time Wellness Analyzer (No Logs)", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    print("📴 Webcam stopped. No data was saved.")

if __name__ == "__main__":
    main()
