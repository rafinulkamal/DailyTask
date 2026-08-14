# DailyTask

একটা full-stack Daily Task Manager app — React (frontend) + Node/Express (backend) + MongoDB (database), সাথে JWT দিয়ে Login/Register system।

## Folder Structure

```
DailyTask/
├── backend/
│   ├── config/db.js
│   ├── models/User.js, Task.js
│   ├── routes/auth.js, tasks.js
│   ├── middleware/auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── context/AuthContext.jsx
    │   ├── components/TaskItem.jsx, ProtectedRoute.jsx
    │   ├── pages/Login.jsx, Register.jsx, Dashboard.jsx
    │   ├── App.jsx, main.jsx, index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Setup

### 1. Extract করার নিয়ম (গুরুত্বপূর্ণ)

zip ফাইল extract করার সময় শুধু **"Extract Here"** বা destination path থেকে শেষের `\DailyTask` অংশটা বাদ দিয়ে extract করুন, নাহলে `DailyTask\DailyTask\backend` এর মতো nested folder তৈরি হয়ে যাবে।

### 2. Backend

```bash
cd backend
npm install
copy .env.example .env
```

`.env` ফাইলে `MONGO_URI` বসান। দুইভাবে করা যায়:

**Option A — MongoDB Atlas (cloud, recommended)**

[mongodb.com/atlas](https://www.mongodb.com/atlas) থেকে ফ্রি cluster বানিয়ে connection string নিন। যদি SRV connection string (`mongodb+srv://...`) দিয়ে এই error আসে:

```
MongoDB connection error: querySrv ECONNREFUSED
```

তাহলে সেটা network/DNS সমস্যা (Windows/ISP এ common)। সমাধান:
- `ipconfig /flushdns` চালান (Admin PowerShell এ)
- Network adapter এ DNS `8.8.8.8` সেট করুন
- এরপরও কাজ না করলে, Atlas এর Connect স্ক্রিনে **"View full code sample"** toggle করে standard (non-SRV) connection string ব্যবহার করুন, যেটা `mongodb://` দিয়ে শুরু হয় এবং একাধিক host list করে — এতে SRV DNS lookup লাগে না।

**Option B — Local MongoDB**

MongoDB Community Server local এ install করলে:
```
MONGO_URI=mongodb://127.0.0.1:27017/dailytask
```

```bash
npm run dev
```
Backend চলবে: `http://localhost:5000` — টার্মিনালে `MongoDB connected` দেখতে হবে।

### 3. Frontend (নতুন টার্মিনালে, backend চলা অবস্থায়)

```bash
cd frontend
npm install
npm run dev
```
Frontend চলবে: `http://localhost:5173`

## Features

- Register / Login (JWT-based auth, bcrypt password hash)
- Protected routes
- Task Add / Complete-toggle / Delete, priority (low/medium/high)
- প্রতিটা user শুধু নিজের task দেখবে

## API Endpoints

| Method | Endpoint            | Description         | Auth |
|--------|----------------------|-----------------------|------|
| POST   | /api/auth/register    | নতুন user register     | না   |
| POST   | /api/auth/login       | Login                 | না   |
| GET    | /api/auth/me           | Logged-in user info   | হ্যাঁ |
| GET    | /api/tasks              | সব task লিস্ট          | হ্যাঁ |
| POST   | /api/tasks              | নতুন task তৈরি          | হ্যাঁ |
| PUT    | /api/tasks/:id           | Task update            | হ্যাঁ |
| DELETE | /api/tasks/:id           | Task delete            | হ্যাঁ |
