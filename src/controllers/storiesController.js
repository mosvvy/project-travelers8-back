import { Story } from '../models/story.js';
import { Category } from '../models/category.js';
import createHttpError from 'http-errors';

export const getAllStories = async (req, res, next) => {
  try {
    const { page, perPage, category } = req.query;

    const skip = (page - 1) * perPage;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    const [totalStories, stories] = await Promise.all([
      Story.countDocuments(filter),
      Story.find(filter)
        .skip(skip)
        .limit(perPage)
        .populate({
          path: 'ownerId',
          select: 'name avatarUrl',
        })
        .populate({
          path: 'category',
          select: 'name',
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalStories / perPage) || 1);

    res.status(200).json({
      page,
      perPage,
      totalStories,
      totalPages,
      stories,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStoryController = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const userId = req.user._id;

    const updatedStory = await Story.findOneAndUpdate(
      { _id: storyId, owner: userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedStory) {
      return res.status(404).json({
        message: 'Story not found',
      });
    }

    return res.status(200).json(updatedStory);
  } catch (error) {
    next(error);
  }
};