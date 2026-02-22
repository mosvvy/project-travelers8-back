import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerController } from '../controllers/authController.js';
import { registerSchema } from '../validation/authValidation.js';
import { loginUser, logoutUser } from '../controllers/authController.js';
import { loginUserSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/auth/register', celebrate(registerSchema), registerController);
router.post('/auth/logout', logoutUser);

export default router;
