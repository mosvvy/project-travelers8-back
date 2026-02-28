import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  createStory,
  updateStoryController,
  getFavouriteStories,
} from '../controllers/storiesController.js';
import {
  getAllStoriesSchema,
  createStorySchema,
  updateStorySchema,
  getFavouriteStoriesSchema,
} from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
const router = Router();

router.get('/stories', celebrate(getAllStoriesSchema), getAllStories);
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

router.get(
  '/stories/favourite',
  authenticate,
  celebrate(getFavouriteStoriesSchema),
  getFavouriteStories,
);

export default router;
