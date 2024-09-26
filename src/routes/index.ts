import express, { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { config } from '../shared/config';

import { logVisit } from '../middlewares/log-visit';
import { createSearch } from '../middlewares/create-search';

export const indexRouter = express.Router();

indexRouter.get('/', logVisit('/'), async (request: Request, response: Response): Promise<void> => {
  
  response.render('index', {
    ...config,
    title: 'Google, now sponsored by the NFL'
  });

});

indexRouter.post('/', createSearch, async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const search = request.search;
  if (!search) {
    return next(createError(500, 'Search not found'));
  }
  response.redirect(`https://www.${search.redirect}.com/search?q=${encodeURIComponent(search.answer)}`);

});