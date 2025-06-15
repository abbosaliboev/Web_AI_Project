# StreamingLogic 1과 2를 잘 조합해서 하면 될 듯.

# source of code
# https://docs.ultralytics.com/modes/predict/#streaming-source-for-loop
import cv2

from ultralytics import YOLO
from subprocess import Popen, PIPE
from datetime import datetime
import time
import Web as wb

# Load the YOLO model

cap = [cv2.VideoCapture(0),cv2.VideoCapture(1),cv2.VideoCapture(2),cv2.VideoCapture(3),cv2.VideoCapture(4),cv2.VideoCapture(5)]

width = int(cap[0].get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap[0].get(cv2.CAP_PROP_FRAME_HEIGHT))

model = YOLO("C:\\Users\\dalab\\Desktop\\JsmServer\\Web\\best.pt")
ffmpeg = Popen([
    'ffmpeg',
    '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-pix_fmt', 'bgr24',
    '-s', f'{width}x{height}',  # resolution
    '-i', '-',  # input from stdin
    '-f', 'rtsp',
    'rtsp://localhost:8554/mystream'
], stdin=PIPE, stderr=PIPE)

falerts = [[],[],[],[],[],[]]
gframe = [None,None,None,None,None,None]

def cameraTask(index):
    while cap[index].isOpened():
        success, frame = cap[index].read()

        if success:
            # Run YOLO inference on the frame
            results = model(frame, verbose=False)
        
            # Visualize the results on the frame
            annotated_frame = results[0].plot()

            alert = []
            for box in results[0].boxes:
                class_id = int(box.cls)  # Get class ID
                class_label = results[0].names[class_id]
                if class_label == "head":
                    alert = "no_helmet" 
        
        
            try:
                ret, jpeg = cv2.imencode('.jpg', annotated_frame)
                if not ret:
                    continue
                gframe[index] = jpeg
                yield (
                    b"--frame\r\n"
                    b"Content-Type: image/jpeg\r\n\r\n" + jpeg.tobytes() + b"\r\n"
                )
            except Exception as e:
                return e
            falerts[index] = alert

        time.sleep(0.01)
            
def RetAlert(index):
    if cap[index].isOpened():
        return falerts[index]
    
def Capture(index):
    if cap[index].isOpened():
        return gframe[index]