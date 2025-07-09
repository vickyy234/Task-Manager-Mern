import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

const router = Router();

router.use(authMiddleware);

// Add task
router.post("/addNewTask", async (req, res) => {
  try {
    const { sharedWith = [], ...rest } = req.body;

    // Convert email(s) to ObjectId(s)
    const sharedWithIds = await Promise.all(
      sharedWith.map(async (email) => {
        const user = await User.findOne({ email });
        if (!user) {
          return res
            .status(404)
            .json({ message: "User not found with email: " + email });
        }
        return user._id;
      })
    );

    const newTask = await Task.create({
      ...rest,
      sharedWith: sharedWithIds,
      user: req.userId,
    });
    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (error) {
    console.log("Error creating task: ", error);
    res.status(500).json({ message: "Error creating task" });
  }
});

// Update task
router.put("/update/:id", async (req, res) => {
  try {
    const { sharedWith = [], ...rest } = req.body;
    let sharedWithIds = [];
    if (sharedWith.length > 0) {
      sharedWithIds = await Promise.all(
        sharedWith.map(async (email) => {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error(`User with email "${email}" not found`);
          }
          return user._id;
        })
      );
    }
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        ...rest,
        ...(sharedWith.length > 0 && { sharedWith: sharedWithIds }), // only update if sharedWith is present
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error("Error updating task: ", error.message);
    res.status(500).json({ message: error.message || "Error updating task" });
  }
});

// Delete task
router.delete("/delete/:id", async (req, res) => {
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

// Get all tasks
router.get("/getAllTasks", async (req, res) => {
  const userId = req.userId;

  try {
    // Get tasks owned by the user
    const myTasks = await Task.find({ user: userId })
      .populate("user", "name email")
      .populate("sharedWith", "name email");

    // Get tasks shared with the user
    const sharedTasks = await Task.find({ sharedWith: userId })
      .populate("user", "name email")
      .populate("sharedWith", "name email");

    // Get current date (for overdue check)
    const currentDate = new Date();

    // Count logic
    const totalTasks = myTasks.length;
    const todoTasks = myTasks.filter((task) => task.status === "To Do").length;
    const completedTasks = myTasks.filter(
      (task) => task.status === "Completed"
    ).length;
    const inProgressTasks = myTasks.filter(
      (task) => task.status === "In progress"
    ).length;
    const overdueTasks = myTasks.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) < currentDate &&
        task.status !== "Completed"
    ).length;
    const sharedTasksCount = sharedTasks.length;

    res.status(200).json({
      summary: {
        totalTasks,
        todoTasks,
        completedTasks,
        inProgressTasks,
        overdueTasks,
        sharedTasks: sharedTasksCount,
      },
      myTasks,
      sharedTasks,
    });
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

export default router;
