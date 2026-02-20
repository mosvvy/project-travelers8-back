import express from 'express';
import { updateStoryController } from '../controllers/stories.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// PATCH /api/stories/:id
router.patch('/:id', authenticate, updateStoryController);

export default router;
