import { User } from '../models/user.js';
import { Story } from '../models/story.js';
import createHttpError from 'http-errors';
// GET /api/users/me - приватний ендпоінт інформація про поточного користувача
export const getCurrentUser = async (req, res) => {
  res.status(200).json(req.user);
};