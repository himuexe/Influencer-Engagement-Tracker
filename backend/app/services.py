import pandas as pd
from .models import Influencer
from sqlalchemy.orm import Session

def read_csv_data(platform: str):
    if platform == "instagram":
        data = pd.read_csv('Test_DataSets/Instagram.csv')
    elif platform == "tiktok":
        data = pd.read_csv('Test_DataSets/Tiktok.csv')
    elif platform == "youtube":
        data = pd.read_csv('Test_DataSets/Youtube.csv')
    else:
        return None
    return data

def analyze_engagement(data):
    engagement_rate = (data['likes'] + data['comments']) / data['followers_count']
    return engagement_rate

def save_influencer_data(db: Session, name: str, platform: str, followers_count: int, engagement_rate: float):
    influencer = Influencer(
        name=name,
        platform=platform,
        followers_count=followers_count,
        engagement_rate=engagement_rate,
        roi=0.0, 
        audience_demographics="{}",  
    )
    db.add(influencer)
    db.commit()
    db.refresh(influencer)
    return influencer
