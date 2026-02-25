import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Story } from '../models/story.js';

export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const totalUsers = await User.countDocuments();
    const users = await User.find().skip(skip).limit(perPage);

    res.status(200).json({
      page,
      perPage,
      totalUsers,
      totalPages: Math.ceil(totalUsers / perPage),
      users,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).lean();
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    if (user.password) delete user.password;

    const articles = await Story.find({ ownerId: id })
      .select('title img date favoriteCount category')
      .sort({ date: -1 })
      .lean();

    return res.json({ user, articles });
  } catch (err) {
    next(err);
  }
};
