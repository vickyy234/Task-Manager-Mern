import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Task from '../models/Task.js'

const router = Router();

router.use(authMiddleware);

// Add task
router.post('/addNewTask', async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            user: req.userId
        });
        res.status(201).json({ message: "Task created successfully", newTask });
    } catch (error) {
        console.log("Error creating task: ", error);
        res.status(500).json({ message: "Error creating task" });
    }
});

// Get all tasks
router.get('/getAllTasks', async (req, res) => {
    const userId = req.userId;
    try {
        const myTasks = await Task.find({ user: userId }).populate('user', 'name email').populate('sharedWith', 'name email');
        const sharedTasks = await Task.find({ sharedWith: userId }).populate('user', 'name email').populate('sharedWith', 'name email');
        res.status(200).json({ myTasks, sharedTasks });
    } catch (error) {
        console.log("Error fetching tasks: ", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

// Update task
router.put('/update/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        } else {
            res.status(200).json({ message: "Task updated successfully", updatedTask });
        }
    } catch (error) {
        console.log("Error updating task: ", error);
        res.status(500).json({ message: "Error updating task" });
    }
});

// Delete task
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        } else {
            res.status(200).json({ message: "Task deleted successfully" });
        }
    } catch (error) {
        console.log("Error deleting task: ", error);
        res.status(500).json({ message: "Error deleting task" });
    }
});

export default router;