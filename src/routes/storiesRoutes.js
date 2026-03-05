import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  getStory,
  createStory,
  updateStoryController,
  getFavouriteStories,
  getPopularStories,
  getOwnStories,
} from '../controllers/storiesController.js';
import {
  getAllStoriesSchema,
  createStorySchema,
  getStoryByIdSchema,
  updateStorySchema,
  getFavouriteStoriesSchema,
} from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.get('/stories/popular', getPopularStories);

router.get(
  '/stories/favourite',
  authenticate,
  celebrate(getFavouriteStoriesSchema),
  getFavouriteStories,
);
router.get(
  '/stories/own',
  authenticate,
  celebrate(getAllStoriesSchema),
  getOwnStories,
);

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
