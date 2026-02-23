import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { getUsers } from '../controllers/usersController.js';

const router = Router();

router.get('/users', getUsers);

export default router;
