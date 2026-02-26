import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import { connectMongoDB } from './db/connectMongoDB.js';

import storiesRoutes from './routes/storiesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT ?? 3000;
const allowedOrigins = [
  `http://localhost:${process.env.PORT_FRONT ?? 3001}`,
  process.env.FRONTEND_DOMAIN ?? 'https://project-travelers8-front.vercel.app/',
];

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(authRoutes);
app.use(usersRoutes);
app.use(storiesRoutes);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
