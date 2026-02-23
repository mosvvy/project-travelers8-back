import { Router } from 'express';
import { createStorySchema } from '../validations/storiesValidation.js';
import { createStory } from '../controllers/storiesController.js';
import { celebrate } from 'celebrate';
const router = Router();

router.post(
  '/stories',
  //   authentificate,
  //   upload.single('img'),
  celebrate(createStorySchema),
  createStory,
);

export default router;
