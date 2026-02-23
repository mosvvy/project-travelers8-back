import { User } from '../models/user.js';

export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .skip(skip)
      .limit(perPage);

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
