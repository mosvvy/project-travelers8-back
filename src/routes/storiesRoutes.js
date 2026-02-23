import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { createStorySchema } from '../validations/storiesValidation.js';
import { createStory } from '../controllers/storiesController.js';
import { celebrate } from 'celebrate';
import { upload } from '../middleware/multer.js';
const router = Router();

router.post(
  '/stories',
  authenticate,
  upload.single('img'),
  celebrate(createStorySchema),
  createStory,
);

export default router;
