const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");
const helmet = require("helmet"); // Add helmet import

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Helmet Security Headers
app.use(helmet()); // Basic helmet configuration

// Additional specific helmet configurations
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://todo-api-mern.onrender.com"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      frameAncestors: ["'none'"],
      formAction: ["'self'"],
      baseUri: ["'self'"]
    }
  })
);

// HSTS configuration (Already included in helmet, but you can customize)
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  })
);

// Permissions policy
app.use(
  helmet.permittedCrossDomainPolicies({
    permittedPolicies: "none"
  })
);

// Routes
app.use("/api/tasks", taskRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Server startup
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
