import { Article } from '../models/story.js';

export const getFavouriteStories = async (req, res) => {
  const { page, perPage } = req.query;
  const skip = (page - 1) * perPage;

  const savedArticleIds = req.user.savedArticles;

  const [totalItems, stories] = await Promise.all([
    Article.countDocuments({ _id: { $in: savedArticleIds } }),
    Article.find({ _id: { $in: savedArticleIds } })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    stories,
  });
};
