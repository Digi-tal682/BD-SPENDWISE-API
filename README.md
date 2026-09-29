# SpendWise API - Student Expense Tracker
Sub-Group 3B | Node.js + Express Project

<p align="center">
  <img src="./assets/spendwise-logo.png" width="350" alt="SpendWise Logo" />
</p>

<h1 align="center">SpendWise</h1>
<h3 align="center">Track Smart, Spend Wise, Save Better.</h3>

<p align="center">
  <b>API • EXPENSE TRACKER</b><br>
  Sub-Group 3B | Group 3 Project - Solution 2 of 3
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.x-brightgreen" />
  <img src="https://img.shields.io/badge/Express-5.x-black" />
  <img src="https://img.shields.io/badge/Status-In%20Progress-yellow" />
</p>

---
## 🚀 Live Deployment
**Live URL:** https://bd-spendwise-api-digi-tal682.onrender.com
**Status:** Live ✅ | MongoDB Connected ✅
Test: Open the URL — you should see "SpendWise API is working + MongoDB config ready!"

---
### 💡 About
SpendWise is a RESTful API designed to help students track daily expenses, manage budgets, and gain quick insights into spending habits. This is **Solution 2 of 3** for the overall Group 3 project.

> **Mission:** Making student finances simple and transparent.

### ✨ Core Features
- Add / Edit / Delete expenses
- Categorize spending (Food, Transport, Data, etc.)
- Budget alerts via the Vault routes
- Quick insights via the Flash routes

### 🏗️ Project Structure

```
BD-SPENDWISE-API/
├── assets/
│   └── spendwise-logo.png
├── src/
│   ├── config/
│   │   └── db.js                     MongoDB connection
│   ├── middleware/
│   │   └── auth.js                   JWT auth middleware (in progress)
│   ├── models/
│   │   └── expenses.js               Mongoose schema for expenses
│   ├── routes/
│   │   ├── atlas.js                  Expense CRUD routes
│   │   ├── flash.js                  Analytics routes
│   │   └── vault.js                  Budget routes
│   └── utils/                        Helpers (to be filled in)
├── .env.example
├── .gitignore
├── server.js                         App entry point (port 3000)
├── package.json
├── package-lock.json
└── README.md
```

### 🚀 How to Run

```bash
npm install
cp .env.example .env
npm run dev
```

Server runs on http://localhost:5000

## API Endpoints

Base URL: `http://localhost:5000`

### Expense endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Stub route, returns a placeholder message |
| GET | `/api/v1/atlas/expenses` | List all expenses |
| POST | `/api/v1/atlas/expenses` | Create a new expense |

### POST /api/v1/atlas/expenses — example

```json
{
  "amount": 3000,
  "category": "Food",
  "date": "2026-09-19",
  "description": "Shawarma after coding"
}
```

Response: `201 Created` with the created expense.

### Other feature routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/atlas/summary` | Atlas summary (stub) |
| GET | `/api/v1/flash/summary` | Flash summary (stub) |
| GET | `/api/v1/vault/summary` | Vault summary (stub) |

## Sample Data
- Food: Lunch, Garri
- Data: MTN monthly data
- Transport: Bus fare

## Tools Used
- Express.js
- Thunder Client / Postman
- Node.js

# Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit (`git commit -m "Add your feature"`)
4. Push (`git push origin feature/your-feature`)
5. Open a Pull Request

## Environment Setup

```bash
cp .env.example .env
```

Fill in `MONGODB_URI` and `JWT_SECRET` in `.env`.

### 👥 Team 3B
- Lead (Raliat Babatunde)
- (Victor Oriabure)
- [Favour Samuel, ZAH NEMBO, Emmanuel Odekunle, Lawal Yusuf, Zaynab Babatunde, Olusola Osasan, Ishoborabyose Clementine, Samuel Kweku Tawiah Agbozo, Oluwakayode Adenibuyan, Waheed Royhan]

<p align="center"><i>Built with ❤️ - Track Smart, Spend Wise, Save Better.</i></p>

## Author
Group 3B - SpendWise API Project 2026
