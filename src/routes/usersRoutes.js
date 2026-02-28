import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import {
  getUsers,
  getUserById,
  getCurrentUser,
  saveStory,
} from '../controllers/usersController.js';
import { getUserByIdSchema } from '../validations/usersValidation.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', authenticate, getCurrentUser);
router.get('/users/:id', celebrate(getUserByIdSchema), getUserById);
router.post('/users/save', authenticate, saveStory);

export default router;
