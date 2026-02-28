import { Router } from 'express';
import { getAllCategoryController } from '../controllers/categoryController.js';

const router = Router();

router.get('/categories', getAllCategoryController);

export default router;
