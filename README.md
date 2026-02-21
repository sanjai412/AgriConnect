# AgriConnect 🧾

AgriConnect is a collaborative platform that connects farmers with agricultural students and experts to solve farming issues quickly. It features a modern, mobile-first design tailored for ease of use, multilingual support, and a rewarding gamification system for experts.

## 🚀 Features

- **Farmer Module**: Submit queries via text and image (voice coming soon). View status and expert responses.
- **Expert/Student Module**: Filter queries by crop, location, and issue type. Earn points and badges for helpful answers.
- **Real-time Interaction**: Real-time messaging and notifications (via Socket.io).
- **Learning Corner**: Curated tutorials and agricultural tips.
- **Incentive System**: Leaderboard and badges for active contributors.
- **Aesthetics**: Premium Glassmorphism UI with smooth animations and dark/light mode support.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Framer Motion, Lucide Icons, Axios.
- **Backend**: Node.js, Express, PostgreSQL, Socket.io, JWT.
- **Styling**: Vanilla CSS with a custom design system.

## 📦 Setup Instructions

### Prerequisites
- Node.js installed.
- PostgreSQL database running.

### 1. Database Setup
1. Create a PostgreSQL database named `agriconnect`.
2. Update the `DATABASE_URL` in `backend/.env` (copy from `.env.example`).
3. Run the setup script:
   ```bash
   npm run db:setup
   ```

### 2. Backend Installation
```bash
cd backend
npm install
npm start
```

### 3. Frontend Installation
```bash
cd frontend
npm install
npm run dev
```

### 4. Running the Application
Once both servers are running, open your browser at [http://localhost:5173](http://localhost:5173).

## 🗄 Database Schema

The application uses the following tables:
- `users`: Stores farmer, student, expert, and admin profiles.
- `roles`: Role-based access control (RBAC).
- `queries`: Farmer questions with multi-media support.
- `responses`: Expert answers and discussions.
- `rewards`: Tracking points and badges.
- `learning_resources`: Articles and video tutorial data.
- `notifications`: Real-time user alerts.

## 🌟 Bonus AI Features (Roadmap)
- Image-based crop disease detection using AI vision APIs.
- Smart suggestions for similar past queries.

---
Built with ❤️ by AgriConnect Team.
