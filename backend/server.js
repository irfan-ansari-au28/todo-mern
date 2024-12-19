const dontenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// SECURITY HEADERS: Added to improve security
app.use((req, res, next) => {
  // Strict-Transport-Security (HSTS) - Enforce HTTPS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Content-Security-Policy (CSP) - Prevent Cross-site scripting (XSS) and data injection attacks
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';");

  // X-Frame-Options - Prevent Clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // X-Content-Type-Options - Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Referrer-Policy - Control the information sent with the Referer header
  res.setHeader('Referrer-Policy', 'no-referrer');

  // Permissions-Policy - Control access to various browser features
  res.setHeader('Permissions-Policy', 'geolocation=(self), microphone=()');
  
  next();
});

app.use("/api/tasks", taskRoutes);

// ROUTE
app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
