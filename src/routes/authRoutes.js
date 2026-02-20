import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
const router = Router();

router.post('/auth/logout', authenticate, logoutUser);

export default router;
