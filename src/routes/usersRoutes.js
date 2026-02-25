import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import {
  getUsers,
  getUserById,
  getCurrentUser,
} from '../controllers/userController.js';
import { getUserByIdSchema } from '../validations/usersValidation.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', authenticate, getCurrentUser);
router.get('/users/:id', celebrate(getUserByIdSchema), getUserById);

export default router;
