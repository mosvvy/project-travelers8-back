import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerController,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/auth/register', celebrate(registerSchema), registerController);
router.post('/auth/logout', logoutUser);

export default router;
