# Tai-One Media - Digital Magazine Platform

A full-stack digital magazine application featuring user dashboards, seller platforms, transaction management, and social media features.

## Tech Stack
- **Frontend**: React.js with component library
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT

## Features
✅ User & Seller Dashboards
✅ Transaction Cart for Sales
✅ Content Upload for Sellers
✅ Login/Registration System
✅ Timeline Feed
✅ Story Component
✅ Notification System

## Project Structure
```
tai-one-media/
├── frontend/          # React application
├── backend/           # Node.js API server
└── docs/              # Documentation
```

## Getting Started

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Key Components

### Frontend Components
- **LoginPage** - User authentication
- **RegisterPage** - New user registration
- **UserDashboard** - Reader dashboard with purchases
- **SellerDashboard** - Seller dashboard with analytics
- **TimelinePage** - Social feed
- **TransactionCart** - Shopping cart system
- **ContentUpload** - File upload for sellers
- **Timeline** - Feed display
- **Story** - Story component
- **Notifications** - Notification bell and panel

### Backend Models
- **User** - User accounts with roles (user, seller, admin)
- **Content** - Published articles, magazines, media
- **Transaction** - Purchase records
- **Notification** - User notifications
- **Timeline** - Feed posts
- **Story** - 24-hour stories

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get user profile
- `POST /api/users/follow/:userId` - Follow user

### Content
- `POST /api/content/upload` - Upload content (sellers)
- `GET /api/content` - Get all content
- `GET /api/content/:id` - Get content details
- `PATCH /api/content/:id/publish` - Publish content

### Transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/user` - Get user transactions

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark as read

### Timeline
- `POST /api/timeline` - Create timeline post
- `GET /api/timeline` - Get timeline feed
- `POST /api/timeline/:id/like` - Like post

### Stories
- `POST /api/stories` - Create story
- `GET /api/stories` - Get active stories
- `POST /api/stories/:id/view` - View story
