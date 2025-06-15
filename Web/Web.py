from fastapi import FastAPI, Depends, Path, HTTPException, Response
from starlette.responses import StreamingResponse
from pydantic import BaseModel
from dbengine import engineconn
from models import Test
from JWTManager import create_access_token, decode_token
from datetime import datetime, timedelta
from models import User, Base, Alerts, Images
from sqlalchemy import insert, select
import threading
import camera as cam
import axios
from fastapi.middleware.cors import CORSMiddleware
import tkinter.messagebox as msgbox


thread = threading.Thread(target=cam.cameraTask)
thread.daemon = True
thread.start()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = engineconn(Base)
session = engine.sessionmaker()



@app.get("/api/alerts")
async def get_alerts(pcamera_id: int):
    tmp = cam.RetAlert(pcamera_id)
    if tmp == "no_helmet":
        try:
            tmpimg = cam.Capture(pcamera_id).tobytes()
            img_model = Images(img=tmpimg)
            session.add(img_model)
            stmt = insert(Alerts).values(alert_type=tmp, timestamp=datetime.now(), camera_id=pcamera_id, img_url="http://localhost:8000/api/image?id=" + tmpimg.id)
            session.execute(stmt)
            session.commit()
        except Exception as e:
            msgbox.showerror("Error", e)
    ttmp = session.query(Alerts).all()

    return ttmp
        
@app.post("/api/Authtest")
async def api_atest(list: dict):
    return decode_token(list["Authentication"])
    
@app.get("/api/video/cam{id}/")
async def get_camear(id: int):
    return StreamingResponse(cam.cameraTask(id - 1), media_type="multipart/x-mixed-replace; boundary=frame")

@app.get("/api/cameras")
async def api_cameras():
    Camera = [
        {
            "id": 1,
            "name": "CAM1",
            "stream_url": "http://stream.cam1",
            "status": "Safe",
            "recording": True,
            "last_updated": "2025-06-08T14:04:00Z",
            "violations": {
                "red": 5,
                "yellow": 3
            }
        }
    ]
    return Camera

@app.post("/api/token")
async def login(list: dict):
    stmt = select(User).where(User.username == list["username"])
    if not session.execute(stmt).scalars().first():
        return {"success": False}
    else:
        token = create_access_token(
            data={"username": list["username"], "password": list["password"]},
            expires=timedelta(minutes=120)
        )
        return {"success": True, "token": token}