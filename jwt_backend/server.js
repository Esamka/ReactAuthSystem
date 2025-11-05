// server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3500;

const ACCESS_TOKEN_SECRET = "dev_access_secret_123";
const REFRESH_TOKEN_SECRET = "dev_refresh_secret_456";

// قاعدة بيانات بسيطة داخل الذاكرة (تجريبية)
const users = [];
const ROLES = { User: 2001, Editor: 1984, Admin: 5150 };

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// دوال لتوليد التوكنات
function createAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
function createRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}

// تسجيل مستخدم جديد
app.post("/register", async (req, res) => {
  const { user, pwd } = req.body || {};
  if (!user || !pwd)
    return res.status(400).json({ message: "Username and password required" });

  const exists = users.find((u) => u.user.toLowerCase() === user.toLowerCase());
  if (exists) return res.status(409).json({ message: "Username Taken" });

  const hashed = await bcrypt.hash(pwd, 10);
  //   const roles = users.length === 0 ? [ROLES.Admin] : [ROLES.User];
//   const roles = user === "esam" ? [ROLES.Admin] : [ROLES.User];

  const roles = [ROLES.Admin];

  users.push({ user, pwd: hashed, roles });

  return res.status(201).json({ message: "User registered", user, roles });
});

// تسجيل الدخول
app.post("/auth", async (req, res) => {
  const { user, pwd } = req.body || {};
  if (!user || !pwd)
    return res.status(400).json({ message: "Missing Username or Password" });

  const found = users.find((u) => u.user.toLowerCase() === user.toLowerCase());
  if (!found) return res.status(401).json({ message: "Unauthorized" });

  const match = await bcrypt.compare(pwd, found.pwd);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const payload = { user: found.user, roles: found.roles };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json({ accessToken, roles: found.roles });
});

// تجديد التوكن
app.get("/refresh", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  jwt.verify(cookies.jwt, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const payload = { user: decoded.user, roles: decoded.roles };
    const accessToken = createAccessToken(payload);
    res.json({ accessToken, roles: payload.roles });
  });
});

// تسجيل الخروج
app.post("/logout", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "lax", secure: false });
  res.json({ message: "Logged out" });
});

// اختبار: عرض المستخدمين الحاليين
app.get("/users", (req, res) => {
  res.json(users.map((u) => ({ user: u.user, roles: u.roles })));
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
