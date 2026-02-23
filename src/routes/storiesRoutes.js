import { Router } from 'express';
import { createStorySchema } from '../validations/storiesValidation';
import { createStory } from '../controllers/storiesController';
const router = Router();

router.post(
  '/stories',
  authentificate,
  //   upload.single('img'),
  validate(createStorySchema),
  createStory,
);

export default router;
