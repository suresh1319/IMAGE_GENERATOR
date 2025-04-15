import express from 'express';
const router = express.Router();
import { generateImage } from '../controller/GenerateAiImages.js';

router.post('/', generateImage);

export default router;