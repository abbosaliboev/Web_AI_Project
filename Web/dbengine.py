from sqlalchemy import *
from sqlalchemy.orm import sessionmaker

DB_URL = 'mysql+pymysql://abcd:1234@localhost:3306/jsmWeb'

class engineconn:

    def __init__(self, Base):
        self.engine = create_engine(DB_URL, pool_recycle = 500)
        Base.metadata.create_all(self.engine)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()
        return conn
