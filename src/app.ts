import express, { Express } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRouter from "./routes/auth.route";
import taskRouter from "./routes/task.route";
import { protect } from "./controllers/auth.controller";

const app: Express = express();

app.use(
  cors({
    origin: [
      "https://ayoo-todo-app.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());
// Cookie parser middleware for parsing cookies sent by the client
app.use(cookieParser());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Compress responses
app.use(compression());

// API routes go here
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);

app.use("/app", taskRouter);

export default app;
