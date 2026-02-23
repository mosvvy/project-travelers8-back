import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {getCurrentUser} from '../controllers/userController.js';
const router = Router();
router.get('/users/me', authenticate, getCurrentUser);
export default router;
