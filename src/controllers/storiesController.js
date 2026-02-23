import mongoose from 'mongoose';
import { Story } from '../models/story.js';
import createHttpError from 'http-errors';

export const getAllStories = async (req, res, next) => {
  try {
    const { page, perPage, category } = req.query;

    const pageNumber = Math.max(1, parseInt(page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(perPage) || 10));
    const skip = (pageNumber - 1) * limit;

    const filter = {};

    if (category) {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        throw createHttpError(400, 'Invalid category id');
      }

      filter.category = new mongoose.Types.ObjectId(category);
    }

    const [totalStories, stories] = await Promise.all([
      Story.countDocuments(filter),
      Story.find(filter)
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'ownerId',
          select: 'name avatar',
        })
        .populate({
          path: 'category',
          select: 'name',
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalStories / limit));

    res.status(200).json({
      page: pageNumber,
      perPage: limit,
      totalStories,
      totalPages,
      stories,
    });
  } catch (error) {
    next(error);
  }
};
