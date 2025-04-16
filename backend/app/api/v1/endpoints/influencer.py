from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services import read_csv_data, analyze_engagement, save_influencer_data
from app.database import get_db

router = APIRouter()

@router.get("/fetch/{platform}")
def get_influencer_data(platform: str, db: Session = Depends(get_db)):
    data = read_csv_data(platform)
    if data is None:
        return {"error": "Platform data not found"}
    
    engagement_rate = analyze_engagement(data)
    influencer = save_influencer_data(db, platform, platform, data['followers_count'].iloc[0], engagement_rate)
    return {"influencer": influencer}
