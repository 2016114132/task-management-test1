import express from "express"

const router = express.Router();

// Variable to store tasks in memory
let tasks = [];

// Variable to generate new task ids
let tasksCounter = 1;

// Route to show the form and task screen
router.get("/", (req, res) => {
    res.render("tasks", {
        title: "Task Management",
        tasks: tasks
    });
});

// Route that adds a task to the array
router.post("/add-task", (req, res) => {
    // Extract the data from the request body
    var { title, description } = req.body;

    // Validate that data is valid
    if(!title || !description){
        res.status(400).send('Invalid title or description!');
    }

    // Push a task to the array
    tasks.push(
        {
            id: tasksCounter,
            title: title,
            description: description,
            completed: false
        }
    );

    // Increment the counter for the next task
    tasksCounter++;

    // Redirect back to '/'
    res.redirect('/');
});

// Route to toggle the completed status of a tag by id
router.post("/toggle-task/:id", (req, res) => {
    // Validate that parameter exists
    if(!req.params.id){
        res.status(400).send('Invalid Task ID!');        
    }

    // Loop through the array of tasks to find the correct task, then update the completed status
    tasks.forEach(item => {
        if(item.id == req.params.id){
            item.completed = !item.completed;
        }
    });

    // Redirect back to '/'
    res.redirect('/');
});

// Route to delete a task by id
router.post("/delete-task/:id", (req, res) => {
    // Validate that parameter exists
    if(!req.params.id){
        res.status(400).send('Invalid Task ID!');        
    }

    // Search for the index of the task containing the id
    const indexToRemove = tasks.findIndex(item => item.id == req.params.id);

    // Use splice to remove the item
    tasks.splice(indexToRemove, 1);

    // Redirect back to '/'
    res.redirect('/');
});

export default router