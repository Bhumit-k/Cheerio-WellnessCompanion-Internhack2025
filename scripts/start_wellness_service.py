#!/usr/bin/env python3
"""
Wellness Analysis Service Startup Script
Starts the Flask server for real-time wellness analysis
"""

import subprocess
import sys
import os
import time

def install_requirements():
    """Install required Python packages"""
    requirements = [
        "opencv-python",
        "mediapipe", 
        "numpy",
        "flask",
        "flask-cors",
        "pillow"
    ]
    
    print("📦 Installing required packages...")
    for package in requirements:
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
            print(f"✅ {package} installed")
        except subprocess.CalledProcessError:
            print(f"❌ Failed to install {package}")
            return False
    return True

def start_service():
    """Start the wellness analysis service"""
    try:
        print("🚀 Starting Wellness Analysis Service...")
        
        # Change to scripts directory
        script_dir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(script_dir)
        
        # Start the Flask service
        subprocess.run([sys.executable, "wellness_analysis_service.py"])
        
    except KeyboardInterrupt:
        print("\n🛑 Service stopped by user")
    except Exception as e:
        print(f"❌ Error starting service: {e}")

if __name__ == "__main__":
    print("🎯 Cheerio Wellness Analysis Service")
    print("=" * 40)
    
    # Install requirements
    if install_requirements():
        print("\n🎉 All packages installed successfully!")
        time.sleep(2)
        start_service()
    else:
        print("\n❌ Failed to install required packages")
        sys.exit(1)
