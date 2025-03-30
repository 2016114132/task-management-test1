import { query } from "../config/db.js";

export const getAllTasks = async () => {
    try {
        const result = await query("SELECT * FROM tasks");
        return result.rows;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("An error occurred while adding task.");
    }
};

export const addNewTask = async (title, description) => {
    try {
        const result = await query(
          "INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *",
          [title, description]
        );        
        return result.rows[0];
      } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("An error occurred while adding task.");
      }
     
};
