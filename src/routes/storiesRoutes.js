import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  createStory,
} from '../controllers/storiesController.js';
import {
  getAllStoriesSchema,
  createStorySchema,
} from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
const router = Router();
import { updateStoryController } from '../controllers/storiesController.js';
import { authenticate } from '../middleware/authenticate.js';

router.get('/stories', celebrate(getAllStoriesSchema), getAllStories);
router.patch('/stories/:storyId', authenticate, updateStoryController);

router.post(
  '/stories',
  authenticate,
  upload.single('img'),
  celebrate(createStorySchema),
  createStory,
);

export default router;
