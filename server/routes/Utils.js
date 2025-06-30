import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = Router();

router.get("/getuserdetails", authMiddleware,
   async(req, res) => {
        try {
            const userId = req.userId;
            if (userId) {
                const user = await User.findById(userId);
                res.status(200).json(user);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

export default router;
