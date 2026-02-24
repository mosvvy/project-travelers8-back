import { Story } from '../models/story.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

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
