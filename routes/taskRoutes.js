import express from "express"
import { getAllTasks, addNewTask, toggleCompleted, deleteTask }  from "../models/taskModel.js";

const router = express.Router();
const title = "EZ Task Manager";

// Route to show the form and task screen
router.get("/", async (req, res) => {

    try{
        const taskList = await getAllTasks();    

        res.render("tasks", {
            title: title,
            tasks: taskList
        });
    }catch(error){
        res.status(500).send('An error occurred while getting the list of tasks.');
    }    
    
});

// Route that adds a task to the array
router.post("/tasks", async (req, res) => {
    // Extract the data from the request body
    var { title, description } = req.body;

    // We create a try/catch to capture any errors that might happen and handle it appropriately 
    try{
        // Title is required, validate it was sent
        if(!title){  
            throw new Error("Title is required");     
        }

        // Make sure that title is between 3-100
        if(!(title.length >= 3 && title.length <= 100)){ 
            throw new Error("Title must be between 3-100 characters");          
        }

        // Verify that description does not exceed 500 characters
        if(description && description.length > 500){
            throw new Error("Description cannot exceed 500 characters");          
        }

        // Once data is valid, create the new task
        const newtask = await addNewTask(title, description);         

        // Redirect back to '/'
        res.redirect('/');
    }catch(error) {
        // When there is an error, rerender the page and pass the error message
        const taskList = await getAllTasks();    

        return res.render("tasks", {
            title: title,
            tasks: taskList,
            error: error.message
        });
    }
});

// Route to toggle the completed status of a tag by id
router.patch("/tasks/:id", async (req, res) => {
    try{
        // Validate that parameter exists
        if(!req.params.id){
            throw new Error("Invalid Task ID!");     
        }

        // Update the completed status
        const task = await toggleCompleted(req.params.id);        

        // Redirect back to '/'
        res.redirect('/');
    }catch(error) {
        // When there is an error, rerender the page and pass the error message
        const taskList = await getAllTasks();    

        return res.render("tasks", {
            title: title,
            tasks: taskList,
            error: error.message
        });
    }
});

// Route to delete a task by id
router.delete("/tasks/:id", async (req, res) => {
    try{
        // Validate that parameter exists
        if(!req.params.id){
            throw new Error("Invalid Task ID!");        
        }

        // Update the completed status
        const task = await deleteTask(req.params.id);

        // Redirect back to '/'
        res.redirect('/');
    }catch(error) {
        // When there is an error, rerender the page and pass the error message
        const taskList = await getAllTasks();    

        return res.render("tasks", {
            title: title,
            tasks: taskList,
            error: error.message
        });
    }
});

export default router