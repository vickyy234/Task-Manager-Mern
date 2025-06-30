import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';

// Middleware
import 'dotenv/config';
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Passport configuration + Routes file
import './config/google.js';
import './config/github.js';
import authRoutes from './routes/authRoute.js';
import taskRoutes from './routes/taskRoute.js';

//Routes
app.use('/auth', authRoutes);
app.use('/task', taskRoutes);

// Server + MongoDB
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error: ', err));




// Server and database health check route(ignore it)
app.get('/', (req, res) => {
    const timestamp = new Date().toISOString();
    const ip = req.ip;
    const userAgent = req.get('User-Agent');

    console.log(`✅ Ping received at ${timestamp}`);
    console.log(`📡 Request from IP: ${ip}`);
    console.log(`🧭 User-Agent: ${userAgent}`);

    if (mongoose.connection.readyState === 1) {
        res.send(`<h1>Server is Running</h1> <h2 style="color:green">✅ Database connected successfully!</h2>`);
    } else {
        res.send(`<h1>Server is Running</h1> <h2 style="color:red;">❌ Database not connected!</h2>`);
    }
});
