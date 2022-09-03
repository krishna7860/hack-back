const express = require("express");
const env = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const connect = require("./config/db");
const cors = require("cors");

// Load environment variables
env.config({ path: "./config/config.env" });

// Connect to database
connect();

// Route files
const users = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

// Dev Logging middleware
process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : null;

// File Upload
app.use(fileUpload());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routers
app.use("/api/v1/users", users);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle Unhandled Rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled Rejection : ${err.message}`.red);
  // Close Server
  server.close(() => process.exit(1));
});
