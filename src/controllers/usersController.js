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

export const getCurrentUser = async (req, res) => {
  res.status(200).json(req.user);
};

export const saveStory = async (req, res, next) => {
  try {
    const { storyId } = req.body;
    const userId = req.user._id;

    const story = await Story.findById(storyId);
    // console.log('Story found:', story);
    if (!story) {
      throw createHttpError(404, 'Story not found');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    console.log('User found:', user);
    const isSaved = user.savedStories.includes(storyId);
    const operation = isSaved ? '$pull' : '$addToSet';

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { [operation]: { savedStories: storyId } },
      // { new: true },
    );

    res.status(200).json({
      message: isSaved ? 'Story removed from saved' : 'Story added to saved',
      data: {
        savedStories: updatedUser.savedStories,
      },
    });
  } catch (error) {
    next(error);
  }
};
