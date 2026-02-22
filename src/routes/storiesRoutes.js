import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
import { getFavouriteStories } from '../controllers/storiesController.js';
import { getFavouriteStoriesSchema } from '../validations/storiesValidation.js';
const router = Router();

router.get(
  '/stories/favourite',
  authenticate,
  celebrate(getFavouriteStoriesSchema),
  getFavouriteStories,
);

export default router;
