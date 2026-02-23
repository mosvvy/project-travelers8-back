import { Story } from '../models/story.js';

export const createStory = async (req, res) => {
  console.log('New story:', req.body);

  const newStory = {
    ...req.body,
    ownerId: req.user._id,
    // category: req.body.category,
  };

  // const newStory = await Story.create({
  //   ...req.body,
  //   ownerId: req.user._id,
  //   // category: req.body.category,
  // });
  res.status(201).json(newStory);
};
