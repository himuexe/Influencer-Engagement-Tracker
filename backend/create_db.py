from backend.app.models import Base
from backend.app.database import engine

Base.metadata.create_all(bind=engine)
