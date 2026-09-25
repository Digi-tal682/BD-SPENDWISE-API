# SpendWise API - Student Expense Tracker
Sub-Group 3B | Node.js + Express Project
A simple Node.js + Express API for tracking student expenses.

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

### 💡 About & Tagline
> **Primary Tagline:** "Track Smart, Spend Wise, Save Better."
> **Branding:** API • EXPENSE TRACKER

SpendWise helps students track expenses, manage budgets, and get insights — built as a RESTful API.

### 📌 About
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
├── .env.example                      Environment variable template
├── .gitignore
├── server.js                         App entry point (port 3000)
├── package.json
├── package-lock.json
└── README.md
```

**Run the server with `npm run dev` and open http://localhost:3000**

### 🚀 How to Run

```bash
npm install
cp .env.example .env
# Fill in MONGO_URI and JWT_SECRET in .env
npm run dev
```

Server will show: `Server running on 3000`

## API Endpoints

Base URL: `http://localhost:3000`

### Expense endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | List all expenses (stub — real data pending DB) |
| POST | `/api/expenses` | Create a new expense (planned) |

### POST /api/expenses — example

Request body:

```json
{
  "amount": 3000,
  "category": "Food",
  "date": "2026-09-19",
  "description": "Shawarma after coding"
}
```

Response: `201 Created`

### Feature routes (planned)

The `atlas`, `flash`, and `vault` routers in `src/routes/` will be mounted under `/api/v1/` once their endpoints are implemented:

- `/api/v1/atlas` — Expense CRUD
- `/api/v1/flash` — Analytics
- `/api/v1/vault` — Budgets

## Sample Data
- Food: Lunch, Garri
- Data: MTN monthly data
- Transport: Bus fare

## Tools Used
- Express.js
- Thunder Client / Postman for testing
- Node.js

# Contributing

Fork the repo

Create a new branch (`git checkout -b feature/your-feature`)

Commit changes (`git commit -m "Add your feature"`)

Push to branch (`git push origin feature/your-feature`)

Open a Pull Request

## Environment Setup

```bash
cp .env.example .env
```

Then fill in:
- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — a random secret for signing tokens

### 🔮 Future Work
The second architecture (microservices under `/api/v1/`) will be used for full Group 3 integration.

### 👥 Team 3B
- Lead (Raliat Babatunde)
- (Victor Oriabure)
- [Favour Samuel, ZAH NEMBO, Emmanuel Odekunle, Lawal Yusuf, Zaynab Babatunde, Olusola Osasan, Ishoborabyose Clementine, Samuel Kweku Tawiah Agbozo, Oluwakayode Adenibuyan, Waheed Royhan]

<p align="center"><i>Built with ❤️ - Track Smart, Spend Wise, Save Better.</i></p>

## Author
Group 3B - SpendWise API Project 2026