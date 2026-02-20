import { registerUser } from '../services/authService.js';

export const registerController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};
