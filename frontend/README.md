# Influencer Engagement Tracker

A comprehensive platform for tracking social media influencer engagement metrics across platforms, built with Python, React, and PostgreSQL.

## 📊 Overview

This application helps marketing teams track and analyze influencer performance across social media platforms (Instagram, YouTube, and X/Twitter). It provides real-time analytics, custom reporting, and ROI calculation for influencer marketing campaigns.

## ✨ Features

- **Multi-platform Integration**: Connect to Instagram, X/Twitter, and YouTube APIs
- **Real-time Analytics**: Live dashboards with engagement metrics
- **Campaign Tracking**: Monitor hashtags and campaign-specific content
- **Performance Metrics**: Track engagement rates, follower growth, and ROI
- **Custom Reports**: Generate shareable reports for stakeholders
- **Automated Data Collection**: Scheduled data fetching and processing

## 🛠️ Tech Stack

### Backend
- Python with FastAPI
- PostgreSQL database
- Social Media API clients
- Redis for caching and job scheduling

### Frontend
- React with TypeScript
- Redux Toolkit / React Query for state management
- Material UI and Tailwind CSS 
- Recharts for data visualization

### DevOps
- Docker & Docker Compose
- GitHub Actions for CI/CD
- AWSfor hosting
- Prometheus + Grafana for monitoring
- ELK Stack for logging

## 🚀 Getting Started

### Prerequisites

- Python 3.10 or higher
- Node.js 18.x or higher
- npm 8.x or higher
- PostgreSQL database
- Redis
- API keys for social media platforms

### Installation

1. Clone the repository
```bash
git clone https://github.com/himuexe/Influencer-Engagement-Tracker.git
cd Influencer-Engagement-Tracker
```

2. Set up backend environment
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install backend dependencies
cd backend
pip install -r requirements.txt
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Environment setup
```bash
# Configure backend environment
cp backend/.env.example backend/.env
# Configure frontend environment
cp frontend/.env.example frontend/.env
```

5. Update the `.env` files with your API keys and PostgreSQL credentials

6. Start development servers
```bash
# Start backend server
cd backend
uvicorn main:app --reload   # For FastAPI

# Start frontend server in a new terminal
cd frontend
npm start
```

## 📝 Project Structure

```
Influencer-Engagement-Tracker/
├── backend/                 # Python API (FastAPI )
│   ├── app/                 # Application code
│   │   ├── api/             # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── models/          # Data models
│   │   ├── jobs/            # Scheduled jobs
│   │   └── utils/           # Helper functions
│   └── tests/               # Backend tests
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API client services
│   │   └── utils/           # Helper functions
│   └── tests/               # Frontend tests
├── docker/                  # Docker configuration
│   ├── backend/             # Backend Docker setup
│   ├── frontend/            # Frontend Docker setup
│   └── docker-compose.yml   # Docker Compose config
└── docs/                    # Documentation
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Gentle Reminder—**
Every-time sync your fork then pull in your local machine before you do any changes in your code to avoid merge conflicts:

```bash
# Add the original repository as upstream
git remote add upstream https://github.com/himuexe/Influencer-Engagement-Tracker.git
# Fetch changes from upstream
git fetch upstream

# Merge changes from upstream into your main branch
git checkout main
git merge upstream/main

# Push changes to your fork
git push origin main

# Create a new branch for your feature
git checkout -b feature/YourFeature
```

## 📄 API Documentation

API documentation is available at `/docs` or `/redoc` when running the FastAPI development server, or can be accessed through the Django admin interface.

For social media API reference:
- [X/Twitter API](https://developer.twitter.com/en/docs)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api/)
- [YouTube Data API](https://developers.google.com/youtube/v3)

## 📜 License

This project is licensed under the Apache License - see the LICENSE file for details.

## 👥 Team

- Scrum Master: Himanshu Sharma
- Team Size: 10 members
- Developers: [Team Member Names]

## 🙏 Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/) 
- [React](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Material UI](https://mui.com/)  [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
