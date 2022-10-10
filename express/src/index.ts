import '@/helpers/env';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';

import { tuplesRoute } from './routes/tuples';
import { storeRoute } from './routes/store';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/tuples', tuplesRoute);
app.use('/store', storeRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
