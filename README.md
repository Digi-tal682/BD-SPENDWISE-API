 # SpendWise API - Student Expense Tracker
Sub-Group 3B | Node.js + Express Project
A simple Node.js + Express API for tracking student expenses.

<p align="center">
  <img src="./assets/logo.png" width="350" alt="SpendWise Logo" />
</p>

<h1 align="center">SpendWise</h1>
<h3 align="center">Track Smart, Spend Wise, Save Better.</h3>

<p align="center">
  <b>API • EXPENSE TRACKER</b><br>
  Sub-Group 3B | Group 3 Project - Solution 2 of 3
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-brightgreen" />
  <img src="https://img.shields.io/badge/Express-4.x-black" />
  <img src="https://img.shields.io/badge/Status-Completed-blue" />
</p>

---

### 💡 About & Tagline
> **Primary Tagline:** "Track Smart, Spend Wise, Save Better."
> **Branding:** API • EXPENSE TRACKER

SpendWise helps students track expenses, manage budgets, and get insights — built as a RESTful API.

### 💡 Tagline
> **"Track Smart, Spend Wise, Save Better."**
> Our mission is to help students take control of their daily spending with simple, smart tracking.
### 📌 About
SpendWise is a RESTful API designed to help students track daily expenses, manage budgets, and gain quick insights into spending habits. This is **Solution 2 of 3** for the overall Group 3 project.

> **Tagline:** Track Smart, Spend Wise, Save Better.
> **Mission:** Making student finances simple and transparent.

### ✨ Core Features
- Add / Edit / Delete expenses
- Categorize spending (Food, Transport, Data, etc.)
- Budget alerts via Vault service
- Quick insights via Flash service

### 🏗️ Project Structure
This is the original architecture we are using for Sub-Group 3B submission:
```
spendwise-api/
├─ assets/
│  └─ logo.png
├─ server.js          ----> Main entry (Port 3000)
├─ .env
├─ README.md
└─ src/
   ├─ config/db.js
   ├─ controllers/expense.controller.js - Business logic
   ├─ models/expense.model.js -----------> Data models
   ├─ routes/expense.routes.js -> API END POINTS
   ├─ services/                          -> Core Services(Atlas, Flash and Vault)
   │  ├─ atlas.js
   │  ├─ flash.js
   │  └─ vault.js
   ├─ middleware/auth.js                 -> Logger, Auth, etc
   └─ utils/logger.js
```
## Folder Structure
- `Server.js` (Main) - Runs on http://localhost:3000
- `spend-wise-atlas/Server.js` - Atlas version on port 3003
- `spend-wise-flash/Server.js` - Flash version on port 3001
- `spend-wise-vault/Server.js` - Vault version on port 3002

# SpendWise API

Framework structure completed.

## Structure
src/
  config/db.js - MongoDB connection
  middleware/auth.js - JWT auth team
  models/ - DB schemas (team to fill)
  routes/ - API routes (team to fill)
  utils/ - Helpers (team to fill)

## How to run
npm install
npm run dev

Server will show: Server running on 3000

## API Endpoints

### 1. GET all expenses
URL: GET http://localhost:3000/api/spend-wise
Response: 200 OK with list of 4 default expenses

### 2. POST new expense
URL: POST http://localhost:3000/api/spend-wise
Body (JSON):
{
  "amount": 3000,
  "category": "Food",
  "date": "2026-09-19",
  "description": "Shawarma after coding"
}
Response: 201 Created

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

Create a new branch (git checkout -b feature/your-feature)

Commit changes (git commit -m "Add your feature")

Push to branch (git push origin feature/your-feature)

Open a Pull Request
## Environment Setup

cp .env.example .env


### 🔮 Future Work
The second architecture (microservices under /api/v1/) will be used for full Group 3 integration.

### 👥 Team 3B
- Lead (Raliat Babatunde)
- (Victor Oriabure)
- [Favour Samuel, ZAH NEMBO, Emmanuel Odekunle, Lawal Yusuf, Zaynab Babatunde, Olusola Osasan, Ishoborabyose Clementine, Samuel Kweku Tawiah Agbozo, Oluwakayode Adenibuyan, Waheed Royhan]

<p align="center"><i>Built with ❤️ - Track Smart, Spend Wise, Save Better.</i></p>
## Author
Group 3B - SpendWise API Project 2026 simple Node.js + ExpressAPI for tracking student expenses.
