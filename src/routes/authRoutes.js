import { Router } from 'express';

import { logoutUser } from '../controllers/authController.js';

const router = Router();

router.post('/logout', logoutUser);

export default router;
