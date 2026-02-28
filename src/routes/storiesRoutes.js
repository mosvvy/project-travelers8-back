import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  getStory,
  createStory,
  updateStoryController,
} from '../controllers/storiesController.js';
import {
  getAllStoriesSchema,
  createStorySchema,
  getStoryByIdSchema,
  updateStorySchema,
} from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
const router = Router();

router.get('/stories', celebrate(getAllStoriesSchema), getAllStories);
router.get('/stories/:id', celebrate(getStoryByIdSchema), getStory);
router.patch(
  '/stories/:storyId',
  authenticate,
  celebrate(updateStorySchema),
  updateStoryController,
);

router.post(
  '/stories',
  authenticate,
  upload.single('img'),
  celebrate(createStorySchema),
  createStory,
);

export default router;
