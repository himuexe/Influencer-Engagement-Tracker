from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Influencer(Base):
    __tablename__ = 'influencers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    platform = Column(String)
    followers_count = Column(Integer)
    engagement_rate = Column(Float)
    roi = Column(Float)
    audience_demographics = Column(String)  
