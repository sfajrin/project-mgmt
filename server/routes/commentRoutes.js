import express from 'express';
import {
    addComment,
    getTaskComments,
} from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.post('/', addComment);
commentRouter.get('/task/:taskId', getTaskComments);

export default commentRouter;
