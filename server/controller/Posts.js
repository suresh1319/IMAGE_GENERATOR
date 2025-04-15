import Post from "../models/Posts.js";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { createError } from '../error.js';

dotenv.config();

// Verify Cloudinary configuration
const configureCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        // Test the configuration
        cloudinary.api.ping((error, result) => {
            if (error) {
                console.error('Cloudinary configuration error:', error);
            } else {
                console.log('Cloudinary configured successfully');
            }
        });
    } catch (error) {
        console.error('Error configuring Cloudinary:', error);
        throw error;
    }
};

configureCloudinary();

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: posts,
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        next(createError(500, "Failed to fetch posts. Please try again later."));
    }
};

export const createPost = async (req, res, next) => {
    try {
        const { name, prompt, photo } = req.body;
        
        // Validate input
        if (!name || !prompt || !photo) {
            return next(createError(400, "Name, prompt, and photo are required"));
        }

        // Validate photo data URL
        if (!photo.startsWith('data:image')) {
            return next(createError(400, "Invalid image format"));
        }

        try {
            // Generate a unique public_id based on prompt and timestamp
            const timestamp = new Date().getTime();
            const sanitizedPrompt = prompt.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 40);
            const public_id = `ai_images/${sanitizedPrompt}_${timestamp}`;

            // Upload image to Cloudinary with specific options
            const photoUrl = await cloudinary.uploader.upload(photo, {
                resource_type: "image",
                folder: "ai_images",
                public_id: public_id,
                tags: ["ai_generated", "community_post"],
                transformation: [
                    { quality: "auto" },
                    { fetch_format: "auto" }
                ]
            });

            const newPost = await Post.create({
                name,
                prompt,
                photo: photoUrl.secure_url
            });

            return res.status(201).json({ 
                success: true, 
                data: newPost 
            });
        } catch (uploadError) {
            console.error('Error uploading to Cloudinary:', uploadError);
            return next(createError(500, "Failed to upload image. Please try again."));
        }
    } catch (error) {
        console.error('Error in createPost:', error);
        next(createError(500, "Server error. Please try again later."));
    }
};
