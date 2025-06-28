import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded;
        next();
    } catch (error) {
        console.log("Token verification failed: ", error);
        res.status(401).json({ message: "Invalid token" });
    }
};