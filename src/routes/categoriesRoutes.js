import { Router } from 'express';
import { Category } from '../models/category.js';

const router = Router();

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json({ data: categories });
  } catch (err) {
    next(err);
  }
});

export default router;
