from sqlalchemy import Column, TEXT, INT, BIGINT, TIMESTAMP
from sqlalchemy.dialects.mysql import LONGBLOB
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Test(Base):
   __tablename__ = "test"

   id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
   name = Column(TEXT, nullable=False)
   number = Column(INT, nullable=False)

class User(Base):
    __tablename__ = "User"
    
    id = Column(INT, nullable=False, autoincrement=True, primary_key=True)
    username = Column(TEXT, nullable=False)
    password = Column(TEXT, nullable=False)

class Alerts(Base):
    __tablename__ = "Alerts"
    
    id = Column(INT, nullable=False, autoincrement=True, primary_key=True)
    alert_type = Column(TEXT, nullable=False)
    camera_id = Column(TEXT, nullable=False)
    img_url = Column(TEXT, nullable=False)
    timestamp = Column(TIMESTAMP, nullable=False)

class Images(Base):
    __tablename__ = "Images"
    id = Column(INT, nullable=False, autoincrement=True, primary_key=True)
    img = Column(LONGBLOB, nullable=False)

class Reports(Base):
    __tablename__ = "Reports"
    id = Column(INT, nullable=False, autoincrement=True, primary_key=True)
    name = Column(TEXT, nullable=False)
    worker_id = Column(INT, nullable=False,unique=True)
    Department = Column(TEXT, nullable=False)
    Supervisor = Column(TEXT, nullable=False)
    date = Column(TIMESTAMP, nullable=False)
    status = Column(TEXT, nullable=False)