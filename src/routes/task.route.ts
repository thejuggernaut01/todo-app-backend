import express from "express";
import {
  deleteTask,
  addTask,
  getAllTask,
  updateTask,
} from "../controllers/task.controller";
import validate from "../common/schemas/validate";
import { addTaskSchema, updateTaskSchema } from "../common/schemas/taskSchema";

const router = express.Router();

router.get("/tasks", getAllTask);

router.post("/task", validate(addTaskSchema), addTask);

router.patch("/task/:taskId", updateTask);

// router.patch("/task/:taskId", validate(updateTaskSchema), updateTask);

router.delete("/task/:taskId", deleteTask);

export default router;
