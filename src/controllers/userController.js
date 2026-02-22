import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Story } from '../models/story.js';

export const saveStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return next(createHttpError(400, 'Invalid story ID format'));
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return next(createHttpError(404, 'Story not found'));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { savedStories: storyId } },
      { new: true },
    );

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Story successfully saved',
      data: {
        savedStories: updatedUser.savedStories,
      },
    });
  } catch (error) {
    next(error);
  }
};
