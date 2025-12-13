import { log } from "console";
import { extractTaskDetails } from "../services/googleGemini.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTaskService,
} from "../services/task.js";
import { extractTaskDetailsPerplexity } from "../services/perplexityAi.js";

export const createTaskController = async (req, res) => {
  try {
    log(req.body);
    const task = await createTask(req.body);
    res.status(200).json({
      message: "Task created successfully",
      data: task,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Task creation failed" });
  }
};

// List all tasks
export const getTasksController = async (req, res) => {
  try {
    const { status, priority, dueDateFrom, dueDateTo, search } = req.body;

    const tasks = await getAllTasks({
      status,
      priority,
      dueDateFrom,
      dueDateTo,
      search,
    });

    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await updateTaskService(id, req.body);

    return res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteTask(id);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({ error: "Task deletion failed" });
  }
};

export const parseSpeechTask = async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript is required" });
    }

    const parsed = await extractTaskDetails(transcript);
    // const parsed = await extractTaskDetailsPerplexity(transcript);

    return res.status(200).json({
      message: "Transcript parsed successfully",
      success: true,
      data: parsed,
    });
  } catch (error) {
    console.error("Error parsing", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
