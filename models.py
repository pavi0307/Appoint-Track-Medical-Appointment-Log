from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    provider = Column(String)
    date_time = Column(DateTime)
    reason = Column(String)
    status = Column(String, default="Upcoming")
    user_id = Column(Integer, ForeignKey("users.id"))