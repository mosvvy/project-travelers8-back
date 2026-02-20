import { Router } from 'express';
import { registerController } from '../controllers/authController.js';
import { validateBody } from '../middleware/validateBody.js';
import { registerSchema } from '../validation/authValidation.js';

const router = Router();

router.post('/register', validateBody(registerSchema), registerController);

export default router;
