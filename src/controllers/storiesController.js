import { Article } from '../models/story.js';
import createHttpError from 'http-errors';

export const getAllStories = async (req, res) => {
  const { page, perPage, category } = req.query;

  const limit = Math.max(1, parseInt(perPage));
  const skip = (Math.max(1, parseInt(page)) - 1) * limit;

  const storiesQuery = Article.find();

  if (category) {
    storiesQuery.where('category').equals(category);
  }

  const countQuery = storiesQuery.clone().countDocuments();

  storiesQuery
    .skip(skip)
    .limit(limit)
    .populate('ownerId', 'name avatar')
    .populate('category', 'name');

  const [totalStories, stories] = await Promise.all([
    countQuery.exec(),
    storiesQuery.exec(),
  ]);

  const totalPages = Math.ceil(totalStories / limit) || 1;

  res.status(200).json({
    page: Number(page),
    perPage: limit,
    totalStories,
    totalPages,
    stories,
  });
};
