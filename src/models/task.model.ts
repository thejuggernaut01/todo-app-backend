import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: [true, "A title is required"] },
  // description: { type: String, required: [true, "A description is required"] },
  completed: { type: Boolean },
  important: { type: Boolean },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
