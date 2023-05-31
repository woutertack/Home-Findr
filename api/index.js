import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import passport from "passport";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import propertiesRoute from "./routes/properties.js";
import agenciesRoute from "./routes/agencies.js";
import favoritesRoute from "./routes/favorites.js";
import messagesRoute from "./routes/messages.js";
import agencyMessagesRoute from "./routes/agencyMessages.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
// import { registerMiddleware } from "./middleware/index.js";
// import LocalStrategy from "./middleware/auth/LocalStrategy.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();

// set the port for the server to listen on
const port = process.env.PORT;

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
app.use(cors());
// registerMiddleware(app);
app.use(cookieParser());
app.use(express.json());

// //Initialize MongoDB client and database:
// app.use(passport.initialize());

// // Use LocalStrategy to verify the user credentials locally
// passport.use("local", LocalStrategy);

// add image upload
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/properties", propertiesRoute);
app.use("/agencies", agenciesRoute);
app.use("/favorites", favoritesRoute);
app.use("/messages", messagesRoute);
app.use("/agencyMessages", agencyMessagesRoute);

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
