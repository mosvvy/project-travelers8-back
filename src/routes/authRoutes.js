import { Router } from 'express';
import { celebrate } from 'celebrate';
import { loginUser, logoutUser } from '../controllers/authController.js';
import { loginUserSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/auth/logout', logoutUser);

export default router;
