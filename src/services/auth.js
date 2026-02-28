import crypto from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';
import { Session } from '../models/session.js';

const isProd = process.env.NODE_ENV === 'production';

export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(32).toString('hex');
  const refreshToken = crypto.randomBytes(32).toString('hex');

  const session = await Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

  return session;
};

export const setSessionCookies = (res, session) => {
  const common = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  };

  res.cookie('accessToken', session.accessToken, {
    ...common,
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie('refreshToken', session.refreshToken, {
    ...common,
    maxAge: ONE_DAY,
  });

  res.cookie('sessionId', session._id.toString(), {
    ...common,
    maxAge: ONE_DAY,
  });
};
