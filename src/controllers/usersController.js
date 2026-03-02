// filepath: d:\Projects\project-travelers8-back\src\controllers\usersController.js
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Story } from '../models/story.js';

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category } = req.query;

    const user = await User.findById(id).lean();
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    if (user.password) delete user.password;

    const filter = { ownerId: id };
    if (category) filter.category = category;

    const articles = await Story.find(filter)
      .select('title img date favoriteCount category')
      .sort({ date: -1 })
      .lean();

    return res.json({ user, articles });
  } catch (err) {
    next(err);
  }
};