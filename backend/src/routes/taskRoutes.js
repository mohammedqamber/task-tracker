import express from "express";
import { createTaskController, deleteTaskController, getTasksController, parseSpeechTask, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/parse", parseSpeechTask);

router.post("/create", createTaskController);


router.post("/getAllTasks", getTasksController);

router.patch("/updateTask/:id", updateTask )

router.delete("/deleteTask/:id", deleteTaskController)

export default router;
