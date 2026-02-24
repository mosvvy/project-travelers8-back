import Story from '../models/story.js';

export const updateStoryController = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const userId = req.user._id;

    const updatedStory = await Story.findOneAndUpdate(
      { _id: storyId, owner: userId },
      req.body,
      { new: true },
    );

    if (!updatedStory) {
      return res.status(404).json({
        message: 'Story not found',
      });
    }

    res.json(updatedStory);
  } catch (error) {
    next(error);
  }
};
