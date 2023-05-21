import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import propertiesRoute from "./routes/properties.js";
import agenciesRoute from "./routes/agencies.js";
import favoritesRoute from "./routes/favorites.js";
import messagesRoute from "./routes/messages.js";
import cookieParser from "cookie-parser";

const app = express();


dotenv.config();

// set the port for the server to listen on
const port = 3002;

// enable cors
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

//middleware
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/properties", propertiesRoute);
app.use("/api/agencies", agenciesRoute);
app.use("/api/favorites", favoritesRoute);
app.use("/api/messages", messagesRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log(`App listening http://localhost:${port}`);
});
