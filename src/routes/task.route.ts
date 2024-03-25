import express from "express";
import {
  deleteTask,
  addTask,
  getAllTask,
  updateTaskStatus,
  editTask,
} from "../controllers/task.controller";
import validate from "../common/schemas/validate";
import { addTaskSchema } from "../common/schemas/taskSchema";

const router = express.Router();

router.get("/tasks", getAllTask);

router.post("/task", validate(addTaskSchema), addTask);

router.patch("/task/:taskId/edit", editTask);

router.patch("/task/:taskId", updateTaskStatus);
// router.patch("/task/:taskId", validate(updateTaskSchema), updateTask);

router.delete("/task/:taskId", deleteTask);

export default router;
