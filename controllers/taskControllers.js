import { getAllTasks, addNewTask, toggleCompleted, deleteTask, getTask, updateTask }  from "../models/taskModel.js";
const appTitle = "EZ Task Manager";

export const getHome = async (req, res) => {

    try{
        const taskList = await getAllTasks();    

        res.render("tasks", {
            title: appTitle,
            tasks: taskList
        });
    }catch(error){
        res.status(500).send('An error occurred while getting the list of tasks.');
    }    
    
};

export const showEditTask = async (req, res) => {

    try{
        // Validate that parameter exists
        if(!req.params.id){
            throw new Error("Invalid Task ID!");     
        }

        // Get task to edit
        const task = await getTask(req.params.id);       

        res.render("tasks", {
            title: appTitle,
            task: task
        });
    }catch(error){
        res.status(500).send('An error occurred while editing tasks.');
    }    
    
};

export const saveEditedTask = async (req, res) => {
    // Extract the data from the request body
    var { title, description } = req.body;

    try{
        // Validate that parameter exists
        if(!req.params.id){
            throw new Error("Invalid Task ID!");     
        }

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

        // Update the completed status
        const task = await updateTask(req.params.id, title, description);        

        // Redirect back to '/'
        res.redirect('/');
    }catch(error) {
        // When there is an error, rerender the page and pass the error message
        const taskList = await getAllTasks();    

        return res.render("tasks", {
            title: appTitle,
            tasks: taskList,
            error: error.message
        });
    }
};

export const createNewTask = async (req, res) => {
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
            title: appTitle,
            tasks: taskList,
            error: error.message
        });
    }
};

export const toggleStatus = async (req, res) => {
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
            title: appTitle,
            tasks: taskList,
            error: error.message
        });
    }
};

export const removeTask = async (req, res) => {
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
            title: appTitle,
            tasks: taskList,
            error: error.message
        });
    }
};