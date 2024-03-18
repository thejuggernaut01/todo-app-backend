import express from "express";
import {
  deleteTask,
  addTask,
  getAllTask,
  updateTask,
} from "../controllers/task.controller";
import validate from "../common/schemas/validate";
import { addTaskSchema, updateTaskSchema } from "../common/schemas/taskSchema";
import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.get("/tasks", getAllTask);

router.post("/task", protect, validate(addTaskSchema), addTask);

router.patch("/task/:taskId", protect, validate(updateTaskSchema), updateTask);

router.delete("/task/:taskId", protect, deleteTask);

export default router;
