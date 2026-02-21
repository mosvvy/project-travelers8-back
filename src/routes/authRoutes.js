import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerController } from '../controllers/authController.js';
import { registerSchema } from '../validation/authValidation.js';
const router = Router();

router.post('/auth/register', celebrate(registerSchema), registerController);
export default router;
