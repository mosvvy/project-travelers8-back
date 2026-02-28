import { Story } from '../models/story.js';
import { Category } from '../models/category.js';
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

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

export const getStory = async (req, res) => {
  const { id } = req.params;

  const story = await Story.findById(id)
    .populate(['category', 'ownerId'])
    .lean();

  if (!story) {
    throw createHttpError(404, 'Story not found');
  }

  res.status(200).json(story);
};

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
};

export const createStory = async (req, res) => {
  if (!req.file) {
    next(createHttpError(400, 'No file'));
    return;
  }

  const result = await saveFileToCloudinary(req.file.buffer);

  const newStory = await Story.create({
    ...req.body,
    ownerId: req.user._id,
    category: req.body.category,
    date: getCurrentDate(),
    img: result.secure_url,
  });

  res.status(201).json(newStory);
};

export const updateStoryController = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const userId = req.user._id;

    const updatedStory = await Story.findOneAndUpdate(
      { _id: storyId, ownerId: userId },
      req.body,
      // { new: true, runValidators: true },
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
