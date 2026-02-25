import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Story } from '../models/story.js';

export const saveStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const userId = req.user._id;

    const story = await Story.findById(storyId);
    if (!story) {
      return next(createHttpError(404, 'Story not found'));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    const isSaved = user.savedStories.includes(storyId);
    const operation = isSaved ? '$pull' : '$addToSet';

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { [operation]: { savedStories: storyId } },
      { new: true },
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
