import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import postRouter from './router/Post.js'
import generateImageRouter from './router/GenerateAiImage.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));

// API key validation middleware
const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    // Skip validation in development mode or if API key matches
    if (process.env.NODE_ENV === 'development' || apiKey === process.env.STABILITY_API_KEY) {
        return next();
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid or missing API key'
    });
};

// Apply API key validation to routes
app.use('/api/posts', validateApiKey, postRouter);
app.use('/api/generateImage', validateApiKey, generateImageRouter);

app.use((err,req,res,next)=>{
    console.error('Error:', err);
    const status = err.status||500;
    const  message = err.message||"Something Went Wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})
app.get('/',(req,res)=>{
    res.status(200).json({
        message: "Hello Suresh"
    })
})

app.get('/debug/env',(req,res)=>{
    res.status(200).json({
        mongodb_configured: !!process.env.MONGODB_URL,
        stability_configured: !!process.env.STABILITY_API_KEY && process.env.STABILITY_API_KEY !== 'your-api-key-here',
        node_env: process.env.NODE_ENV,
        port: process.env.PORT
    })
})

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in environment variables");
        }

        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        await mongoose.connect(process.env.MONGODB_URL, options);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 8080;
        app.listen(PORT);
    } catch (err) {
        console.error("Server startup error:", err.message);
        process.exit(1);
    }
};

startServer();

