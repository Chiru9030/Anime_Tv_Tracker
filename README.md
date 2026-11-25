# Anime TV Tracker 🎬📊

A full-stack Anime tracking, community discovery, and recommendation platform built with **React + Vite**, **Node.js/Express**, and **MongoDB**. Users can discover trending anime, organize watchlists, write in-depth episode reviews, participate in community clubs, and analyze viewing habits through an interactive analytics dashboard.

---

## 🌟 Key Features

- **Personalized Watchlist & Progress Tracking:** Track episodes watched, plan-to-watch queues, and completion statuses.
- **Community Clubs & Discussions:** Join community clubs to discuss episodes, fan theories, and seasonal releases.
- **Smart Recommendations:** Algorithm-driven recommendation engine tailored to user watch history and ratings.
- **Analytics Dashboard:** Visual insights into watch time, preferred genres, studio distribution, and rating trends.
- **Secure Authentication:** JWT-based stateless authentication with hashed passwords and protected routes.
- **Responsive UI:** Modern, responsive interface built with React, modular CSS, and Lucide icons.

---

## 🏗 Architecture & Tech Stack

```
anime_tv_tracker/
├── frontend/                 # React + Vite Client
│   ├── src/
│   │   ├── components/       # Reusable UI (Sidebar, Cards, Modals)
│   │   ├── pages/            # Home, Show, Clubs, Analytics, Login
│   │   └── App.jsx           # Routing & App Shell
│   └── vite.config.js
└── backend/                  # Node.js + Express API
    ├── config/db.js          # MongoDB Mongoose connection
    ├── middleware/auth.js    # JWT authorization middleware
    ├── models/               # Show, User, Club, Review schemas
    ├── routes/               # API endpoint controllers
    └── server.js             # Express application entrypoint
```

- **Frontend:** React 19, Vite, React Router DOM, Chart.js / Recharts, Lucide Icons
- **Backend:** Node.js, Express.js, Mongoose ODM
- **Database:** MongoDB Atlas / Local MongoDB
- **Security:** JSON Web Tokens (JWT), bcryptjs password hashing, CORS protection

---

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

---

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
```

Edit `.env` with your MongoDB credentials:
```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/anime_tracker
JWT_SECRET=your_jwt_secret_key_here
```

Seed initial anime catalogue & start server:
```bash
# Seed initial anime database
node seed.js

# Start backend server
node server.js
```
The backend API will start on `http://localhost:8000`.

---

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
```

Start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate and receive JWT token

### Shows & Discovery
- `GET /api/shows` - Fetch all shows with pagination and filtering
- `GET /api/shows/:id` - Fetch show details and episode list
- `POST /api/shows` - Add a new show (Admin)

### Clubs & Community
- `GET /api/clubs` - List active fan clubs
- `POST /api/clubs/:id/join` - Join or leave club discussions

### Recommendations & Analytics
- `GET /api/recommendations` - Get personalized show recommendations
- `GET /api/users/profile` - User watch history, stats, and genre breakdown

---

## 🛡 Security & Best Practices
- Environment credentials strictly isolated via `.env` files (excluded from version control).
- Passwords salted and hashed using `bcryptjs`.
- JWT verification on all mutations and sensitive user endpoints.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
