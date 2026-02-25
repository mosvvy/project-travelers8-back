import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getAllStories } from '../controllers/storiesController.js';
import { getAllStoriesSchema } from '../validations/storiesValidation.js';
const router = Router();
import { updateStoryController } from '../controllers/storiesController.js';
import { authenticate } from '../middleware/authenticate.js';

router.get('/stories', celebrate(getAllStoriesSchema), getAllStories);
router.patch('/stories/:storyId', authenticate, updateStoryController);

export default router;
