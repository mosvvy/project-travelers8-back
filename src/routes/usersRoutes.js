import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {getCurrentUser} from '../controllers/userController.js';
import { getUsers } from '../controllers/usersController.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', authenticate, getCurrentUser);
export default router;
