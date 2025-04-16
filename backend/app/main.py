from fastapi import FastAPI
from app.api.v1.endpoints import influencer

app = FastAPI()

# Include routes
app.include_router(influencer.router, prefix="/api/v1", tags=["influencer"])

@app.get("/")
def read_root():
    return {"message": "Influencer Engagement Tracker API is running"}
