import * as dotenv from 'dotenv';
import axios from 'axios';
import { createError } from '../error.js';

dotenv.config();

const STABILITY_API_URL = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

export const generateImage = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new Error("Request body is missing");
        }

        const { prompt } = req.body;
        
        if (!prompt) {
            throw new Error("Prompt is required");
        }

        if (!process.env.STABILITY_API_KEY) {
            throw new Error("STABILITY_API_KEY is not configured");
        }

        const response = await axios.post(
            STABILITY_API_URL,
            {
                text_prompts: [
                    {
                        text: prompt,
                        weight: 1
                    }
                ],
                cfg_scale: 7,
                height: 1024,
                width: 1024,
                steps: 30,
                samples: 1,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`
                }
            }
        );

        if (!response.data?.artifacts?.[0]?.base64) {
            throw new Error("Invalid response from image generation service");
        }

        const imageData = response.data.artifacts[0].base64;
        const imageUrl = `data:image/png;base64,${imageData}`;

        return res.status(200).json({
            success: true,
            photo: imageUrl
        });
    } catch (error) {
        console.error("Image Generation Error:", {
            message: error.message,
            response: error.response?.data
        });
        
        const errorMessage = error.response?.data?.message || error.message;
        next(createError(500, `Failed to generate image: ${errorMessage}`));
    }
};