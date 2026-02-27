import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  getStory,
  createStory,
} from '../controllers/storiesController.js';
import {
  getAllStoriesSchema,
  createStorySchema,
  getStoryByIdSchema,
} from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
const router = Router();

router.get('/stories', celebrate(getAllStoriesSchema), getAllStories);
router.get('/stories/:id', celebrate(getStoryByIdSchema), getStory);
router.post(
  '/stories',
  authenticate,
  upload.single('img'),
  celebrate(createStorySchema),
  createStory,
);

export default router;
