// const User = require('../models/User');
// const Story = require('../models/Story');
// const mongoose = require('mongoose');

// exports.saveStory = async (req, res) => {
//   try {
//     const { storyId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(storyId)) {
//       return res.status(400).json({ message: 'Invalid story ID format' });
//     }

//     const story = await Story.findById(storyId);
//     if (!story) {
//       return res.status(404).json({ message: 'Story not found' });
//     }

//     const user = await User.findById(req.user._id);

//     const isSaved = user.savedStories.includes(storyId);

//     let update;
//     if (isSaved) {
//       update = { $pull: { savedStories: storyId } };
//     } else {
//       update = { $addToSet: { savedStories: storyId } };
//     }

//     await User.findByIdAndUpdate(req.user._id, update);

//     res.status(200).json({
//       message: isSaved ? 'Story removed from saved' : 'Story added to saved',
//       isSaved: !isSaved,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
//
//
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Story from '../models/Story.js';

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
    ).select('-password');

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'));
    }

    res.status(200).json({
      message: 'Story successfully saved',
      savedStories: updatedUser.savedStories,
    });
  } catch (error) {
    next(error);
  }
};
