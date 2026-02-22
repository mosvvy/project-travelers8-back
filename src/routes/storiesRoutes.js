import { Router } from 'express';
import { celebrate } from 'celebrate';

import { getFavouriteStoriesSchema } from '../validations/storyValidation.js';
import { getFavouriteStories } from '../controllers/storiesController.js';
import { authenticate } from '../middleware/authenticate.js';
const router = Router();

router.get(
  '/stories/favourite',
  authenticate,
  celebrate(getFavouriteStoriesSchema),
  getFavouriteStories,
);

export default router;
