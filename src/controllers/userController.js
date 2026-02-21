const User = require('../models/User');
const Story = require('../models/Story');
const mongoose = require('mongoose');

exports.saveStory = async (req, res) => {
  try {
    const { storyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return res.status(400).json({ message: 'Невірний формат ID статті' });
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: 'Статтю не знайдено' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { savedStories: storyId } },
      { new: true },
    ).select('-password');

    res.status(200).json({
      message: 'Статтю успішно додано до збережених',
      savedStories: updatedUser.savedStories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка сервера при збереженні статті' });
  }
};
