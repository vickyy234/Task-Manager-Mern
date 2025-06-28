import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import './config/passport.js';
import authRoutes from './routes/authRoute.js';
import taskRoutes from './routes/taskRoute.js';

// Middleware
dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

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




// Server and database health check (ignore it)
app.get('/', (req, res) => {
    (mongoose.connection.readyState === 1) ?
        res.send(`<h1>Server is Running</h1> <h1 style="color:green">✅ Database connnected successfully!!</h1>`) :
        res.send(`<h1>Server is Running</h1> <h1 style="color:red;">❌ Database not connnected! Please check the connection string and any errors.</h1>`)
})