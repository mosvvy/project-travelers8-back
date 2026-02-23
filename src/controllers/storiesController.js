import { Story } from '../models/story.js';

export const createStory = async (req, res) => {
  const newStory = await Story.create({
    ...req.body,
    ownerId: req.user._id,
    category: req.body.category || null,
  });
  res.status(201).json(newStory);
};
