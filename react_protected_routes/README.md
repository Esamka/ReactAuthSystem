# 🔐 ReactAuthSystem

A complete **Authentication and Authorization System** built with **React.js (Frontend)** and **Node.js + Express (Backend)** using **JWT Tokens** and **Role-Based Access Control** (User, Admin, Editor).

---

## 🚀 Project Overview

This project demonstrates how to implement **Login**, **Registration**, and **Protected Routes** using **JWT Access & Refresh Tokens**.  
It includes a role-based authorization system where each user has specific access rights depending on their role.

---

## ⚙️ Features

- 🧩 Register new users with validation
- 🔑 Login using JWT Access & Refresh Tokens
- 🔒 Protect routes and pages based on authentication
- 🧍 Role-based access (User, Editor, Admin)
- 🍪 Use of **HTTP-only cookies** instead of localStorage for better security
- 🔁 Auto token refresh when the access token expires
- ⚙️ Fully functional backend with Node.js and Express

---

## 🧱 Project Structure

### 🖥️ **Frontend (React.js)**

Located in: `react_protected_routes/`

- **React Router v6** → For navigation and route protection
- **Axios** → To handle API requests
- **Context API** → For managing authentication state
- **Protected Routes** → Implemented with `RequireAuth`
- **Role-based access control** → Users, Editors, and Admins have different permissions

### ⚙️ **Backend (Node.js + Express)**

Located in: `jwt_backend/`

- **Express** → RESTful API server
- **JWT (jsonwebtoken)** → Generates and verifies tokens
- **bcrypt** → Encrypts user passwords
- **cookie-parser** → Handles cookies
- **CORS** → Allows frontend and backend communication

---

## 🧠 How It Works

1. **Registration**

   - A user registers with username and password.
   - The password is hashed and stored in memory.
   - The first registered user becomes an Admin, others are regular Users.

2. **Login**

   - The backend verifies credentials.
   - It generates an **Access Token** and a **Refresh Token**.
   - The Access Token is returned to the frontend, while the Refresh Token is stored in an **HTTP-only cookie**.

3. **Protected Routes**
   - React uses `RequireAuth` to check if the user is authenticated and authorized.
   - If the role matches, access is granted.
   - Otherwise, the user is redirected to the **Unauthorized** page.

---

## 📂 Folder Structure

ReactAuthSystem/
│
├── frontend/
│ └── react_protected_routes/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── hooks/
│ │ ├── api/
│ │ └── App.js
│ └── package.json
│
└── backend/
└── jwt_backend/
├── server.js
└── package.json

---

## 🧪 How to Run

### 1️⃣ Run the Backend

cd jwt_backend
npm install
npm run dev

Server runs on:  
http://localhost:3500

### 2️⃣ Run the Frontend

cd react_protected_routes
npm install
npm start

Frontend runs on:  
http://localhost:3000

---

## 👥 User Roles and Permissions

| Role       | ID   | Access                                   |
| ---------- | ---- | ---------------------------------------- |
| **Admin**  | 5150 | Can access Admin, Lounge, and Home pages |
| **Editor** | 1984 | Can access Editor and Lounge pages       |
| **User**   | 2001 | Can access Home page only                |

---

## 🧰 Technologies Used

- React.js
- React Router v6
- Axios
- Node.js
- Express.js
- JWT (JSON Web Tokens)
- bcrypt
- cookie-parser
- CORS

---

## 🧾 Purpose

This project was built as an educational example to demonstrate how to create  
a **secure authentication and authorization system** with React and Node.js  
using **JWT Tokens**, **Cookies**, and **Role-Based Access Control**.

---

