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
    try:
        stmt = insert(Reports).values(
            name=report["name"],
            worker_id=report["worker_id"],
            Department=report["Department"],
            Supervisor=report["Supervisor"],
            date=report["timestamp"],
            status=report["status"]
        )
        session.execute(stmt)
        session.commit()
        return {"success": True, "message": "Report send successfully"}
    except Exception as e:
        session.rollback()
        return {"success": False, "message": str(e)}
    
@app.get("/api/greport")
async def create_report():
    ttmp = session.query(Reports).all()

    return ttmp



@app.get("/api/summary")
async def summary_entiref(from_date: str, to_date: str):

    # str -> timestamp 변환
    from_for_db = datetime.strptime(from_date, "%Y-%m-%d")
    to_for_db = datetime.strptime(to_date, "%Y-%m-%d")

    # 기간 내의 모든 데이터 가져오기
    data_within_time = session.query(Alerts).filter(Alerts.timestamp.between(from_for_db, to_for_db)).all()

    #  모든 일자를 하나씩 접근하여 데이터 가져오기
    all_weekday_result = []
    for data in data_within_time:
        weekday = data.timestamp.weekday()
        # (요일, 시간, Alerty Type)
        all_weekday_result.append((weekday, data.timestamp.hour, data.alert_type))

    # [[4,5,1,5,1],[4,5,1,15,1],[4,5,12,5,4],...]
    time_line = []

    # [요일, Alert1, Alert2, Alert3, Alert4]
    entire_data = []

    # 각 alert에 대한 기간내에 모든 alert count 저장
    alert1_entire = 0
    alert2_entire = 0
    alert3_entire = 0
    alert4_entire = 0

    # [Heat Map] 요일별로 시간으로 Alert 저장 
    for i in range(7):
        result = []
        for j in range(0,23,2):
            result.append(len([data for data in all_weekday_result if data[0] == i and j<=data[1]<j+2]))

        alert1_total = len([data for data in all_weekday_result if data[0] == i and data[2]=="no_helmet"])
        alert2_total = len([data for data in all_weekday_result if data[0] == i and data[2]=="alert2"])
        alert3_total = len([data for data in all_weekday_result if data[0] == i and data[2]=="alert3"])
        alert4_total = len([data for data in all_weekday_result if data[0] == i and data[2]=="alert4"])

        # 각 Alert들을 누적하여 더하기
        alert1_entire += alert1_total
        alert2_entire += alert2_total
        alert3_entire += alert3_total
        alert4_entire += alert4_total

        time_line.append(result)
        entire_data.append([i,alert1_total,alert2_total,alert3_total,alert4_total])

    return [
        {
            "score_alert1" : alert1_total,
            "score_alert2" : alert2_total,
            "score_alert3" : alert3_total,
            "score_alert4" : alert4_total
        },
        {
            "heat_map_mon" : time_line[0],
            "heat_map_tue" : time_line[1],
            "heat_map_wed" : time_line[2],
            "heat_map_thu" : time_line[3],
            "heat_map_fri" : time_line[4],
            "heat_map_sat" : time_line[5],
            "heat_map_sun" : time_line[6]
        },
        {
            "graph_alert1" : [data[1] for data in entire_data],
            "graph_alert2" : [data[2] for data in entire_data],
            "graph_alert3" : [data[3] for data in entire_data],    
            "graph_alert4" : [data[4] for data in entire_data],
        }
    ]