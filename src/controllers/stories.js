import createHttpError from 'http-errors';
import { updateStory } from '../services/stories.js';

export const updateStoryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const updatedStory = await updateStory(id, userId, req.body);

    if (!updatedStory) {
      throw createHttpError(404, 'Story not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Story updated successfully',
      data: updatedStory,
    });
  } catch (error) {
    next(error);
  }
};
