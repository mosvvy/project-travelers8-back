import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getUserById } from '../controllers/usersController.js';
import { getUserByIdSchema } from '../validations/usersValidation.js';

const router = Router();

// Route only — controller contains logic
router.get('/users/:id', celebrate(getUserByIdSchema), getUserById);

export default router;
