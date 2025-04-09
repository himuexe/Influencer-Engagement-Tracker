# Influencer Engagement Tracker

A comprehensive platform for tracking social media influencer engagement metrics across platforms, built with Node.js, React, and Supabase.

## 📊 Overview

This application helps marketing teams track and analyze influencer performance across social media platforms (Instagram, Twitter, YouTube). It provides real-time analytics, custom reporting, and ROI calculation for influencer marketing campaigns.

## ✨ Features

- **Multi-platform Integration**: Connect to Instagram, Twitter, and YouTube APIs
- **Real-time Analytics**: Live dashboards with engagement metrics
- **Campaign Tracking**: Monitor hashtags and campaign-specific content
- **Performance Metrics**: Track engagement rates, follower growth, and ROI
- **Custom Reports**: Generate shareable reports for stakeholders
- **Automated Data Collection**: Scheduled data fetching and processing

## 🛠️ Tech Stack

### Backend
- Node.js with Express
- Supabase (PostgreSQL database, authentication, storage)
- Social Media API clients
- Bull for job scheduling

### Frontend
- React
- React Query for data fetching
- Recharts for data visualization
- Chakra UI for components

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- Supabase account
- API keys for social media platforms

### Installation

1. Clone the repository
```bash
https://github.com/himuexe/Influencer-Engagement-Tracker.git
cd influencer-engagement-tracker
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment setup
```bash
# Configure backend environment
cp backend/.env.example backend/.env
# Configure frontend environment
cp frontend/.env.example frontend/.env
```

4. Update the `.env` files with your API keys and Supabase credentials

5. Start development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server in a new terminal
cd frontend
npm run dev
```

## 📝 Project Structure

```
influencer-engagement-tracker/
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── api/             # API routes
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

API documentation is available at `/api/docs` when running the development server.

For social media API reference:
- [Twitter API](https://developer.twitter.com/en/docs)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api/)
- [YouTube Data API](https://developers.google.com/youtube/v3)


## 📜 License

This project is licensed under the Apache License - see the LICENSE file for details.

## 👥 Team

- Product Owner: Team-3
- Tech Lead: [Tech Lead Name]
- Developers: [Team Member Names]

## 🙏 Acknowledgements

- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [Recharts](https://recharts.org/)
- [Chakra UI](https://chakra-ui.com/)
