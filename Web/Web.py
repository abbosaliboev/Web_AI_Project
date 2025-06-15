from tokenize import String
from fastapi import FastAPI, Depends, Path, HTTPException, Response
from starlette.responses import StreamingResponse
from pydantic import BaseModel
from dbengine import engineconn
from models import Test
from JWTManager import create_access_token, decode_token
from datetime import datetime, timedelta
from models import User, Base, Alerts, Images, Reports
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
    tmp = cam.RetAlert(pcamera_id - 1)
    if tmp == "no_helmet":
        tmpimg = cam.Capture(pcamera_id - 1)
        img_cls = Images(img=tmpimg)
        session.add(img_cls)
        session.flush()
        stmt = insert(Alerts).values(alert_type=tmp, timestamp=datetime.now(), camera_id=pcamera_id, img_url="http://localhost:8000/api/image?id=" + str(img_cls.id))
        session.execute(stmt)
        session.commit()
    ttmp = session.query(Alerts).filter(Alerts.camera_id == pcamera_id).all()

    return ttmp

@app.get("/api/getalerts")
async def get_alerts():
    ttmp = session.query(Alerts).all()

    return ttmp

@app.get("/api/image")
async def get_image(id: int):
    image = session.query(Images).filter(Images.id == id).first()
    if image:
        return Response(content=image.img, media_type="image/jpeg")
    else:
        raise HTTPException(status_code=404, detail="Image not found")
    
@app.get("/api/video/cam{id}/")
async def get_camear(id: int):
    return StreamingResponse(cam.cameraTask(id - 1), media_type="multipart/x-mixed-replace; boundary=frame")

@app.post("/api/token")
async def login(list: dict):
    stmt = select(User).where(User.username == list["username"], User.password == list["password"])
    if not session.execute(stmt).scalars().first():
        return {"success": False}
    else:
        token = create_access_token(
            data={"username": list["username"], "password": list["password"]},
            expires=timedelta(minutes=120)
        )
        return {"success": True, "token": token}
    
@app.post("/api/report")
async def create_report(report: dict):
    stmt = insert(Reports).values(
        name=report["name"],
        worker_id=report["worker_id"],
        Department=report["Department"],
        Supervisor=report["Supervisor"],
        date=datetime.now(),
        status=report["status"]
    )
    session.execute(stmt)
    session.commit()
    return {"success": True, "message": "Report send successfully"}