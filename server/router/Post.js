import express from 'express';
const router = express.Router();
import { getAllPosts,createPost } from '../controller/Posts.js';

router.get('/', getAllPosts);
router.post('/',createPost);

export default router;