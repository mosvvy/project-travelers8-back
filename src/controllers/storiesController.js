export const createStory = async (req, res) => {
  const newNote = await Note.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(newNote);
};
