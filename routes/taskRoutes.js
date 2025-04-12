import express from "express"
import { getHome, showEditTask, saveEditedTask, createNewTask, toggleStatus, removeTask } from "../controllers/taskControllers.js"

const router = express.Router();

// Route to show the form and task screen
router.get("/", getHome);

// Route to edit a task
router.get("/tasks/:id", showEditTask);

// Route to save edit task
router.put("/tasks/:id", saveEditedTask);

// Route that adds a task to the array
router.post("/tasks", createNewTask);

// Route to toggle the completed status of a tag by id
router.patch("/tasks/:id", toggleStatus);

// Route to delete a task by id
router.delete("/tasks/:id", removeTask);

export default router