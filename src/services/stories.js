import { Story } from '../models/story.js';

export const updateStory = async (storyId, userId, payload) => {
  const story = await Story.findOne({
    _id: storyId,
    owner: userId,
  });

  if (!story) return null;

  Object.assign(story, payload);

  await story.save();

  return story;
};
