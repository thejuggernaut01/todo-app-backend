import { Response } from "express";
import mongoose from "mongoose";

import { CustomRequest } from "../common/interfaces/authInterface";
import TaskModel from "../models/task.model";
import { isValidObjectId } from "mongoose";

export const addTask = async (req: CustomRequest, res: Response) => {
  // extract data from request body
  const { title } = req.body;

  // get current user id
  const currentUserId = req.user._id;

  // Check if the title is missing.
  // If either is missing, return a 400 Bad Request response
  // with an error message indicating incomplete task details.
  if (!title) {
    return res.status(400).json({
      status: "An error occured",
      message:
        "Incomplete task details. Please provide both title and description.",
    });
  }

  try {
    // check if task already exist
    const existingTask = await TaskModel.findOne({
      title,
      userId: currentUserId,
    });

    // if task already exists
    // return a 400 response
    if (existingTask) {
      return res.status(400).json({
        status: "An error occured",
        message: "Task already exists.",
      });
    }

    // if task doesn't exist,
    // create new task
    const newTask = await TaskModel.create({
      title,
      completed: false,
      important: false,
      userId: currentUserId,
    });

    return res.status(201).json({
      message: "Task was created successfully!",
      data: newTask,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "Error",
      message: "Internal server error",
    });
  }
};

export const getAllTask = async (req: CustomRequest, res: Response) => {
  try {
    // get current user id
    const currentUserId = req.user?._id;

    // find task by user id
    const tasks = await TaskModel.find({ userId: currentUserId });

    return res.status(200).json({
      status: "Success",
      data: tasks,
    });
  } catch (error) {
    const castedError = error as Error;
    const { stack: _, ...rest } = castedError;

    return res.status(500).json({
      status: "Error",
      message: "An error occured!",
      error: rest,
    });
  }
};

export const updateTask = async (req: CustomRequest, res: Response) => {
  // extract taskId from request params
  const { taskId } = req.params;

  // extract updated fields from request body
  const { completed, important } = req.body;

  // get current user id
  const currentUserId = req.user?._id;
  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, userId: currentUserId },
      { completed, important },
      { returnOriginal: false }
    ).lean();

    if (!updatedTask) {
      // If no task was found with the given ID and user ID, return a 404 error
      return res.status(404).json({ message: "Task not found" });
    }

    const { userId, ...task } = updatedTask;

    return res
      .status(200)
      .json({ message: "Task status updated successfully", data: task });
  } catch (error) {
    const castedError = error as Error;
    const { stack: _, ...rest } = castedError;

    console.log(error);

    return res.status(500).json({
      status: "Error",
      message: "An error occured!",
      error: rest,
    });
  }
};

export const deleteTask = async (req: CustomRequest, res: Response) => {
  // extract taskId from request params
  const { taskId } = req.params;
  // get current user id
  const currentUserId = req.user?._id;

  try {
    // find and delete task by taskId and userId
    const deletedTask = await TaskModel.findOneAndDelete({
      _id: taskId,
      userId: currentUserId,
    });

    // if task to be deleted doesn't exist
    if (!deletedTask) {
      return res.status(400).json({
        status: "Error",
        message: "Item not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      deletedTask,
    });
  } catch (error) {
    const castedError = error as Error;
    const { stack: _, ...rest } = castedError;

    return res.status(500).json({
      status: "Error",
      message: "An error occured!",
      error: rest,
    });
  }
};
