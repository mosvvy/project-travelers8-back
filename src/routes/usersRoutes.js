import { Router } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Story } from '../models/story.js';

const router = Router();

// Публічний endpoint для отримання даних користувача за його ID разом із його articles
router.get('/api/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await User.findById(id).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Переконатися, що пароль не відображається (у схемі є toJSON, але використано lean())
    if (user.password) delete user.password;

    const articles = await Story.find({ ownerId: id })
      .select('title img date favoriteCount category')
      .sort({ date: -1 })
      .lean();

    return res.json({ user, articles });
  } catch (err) {
    next(err);
  }
});

export default router;
