import { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';

import { answers } from '../shared/answers';
import { Search } from '../entities/search.entity';

export async function createSearch(request: Request, response: Response, next: NextFunction) {
  const lucky = !!request.body.lucky;
  const search = request.body.search;
  const redirect = lucky ? 'bing' : 'google';

  // Generate a random number between 1 and 52
  const randomIndex = Math.floor(Math.random() * 52);
  // Get the answer corresponding to the random index
  const answer = answers[randomIndex];

  // Save all to database:
  await Search.create({
    createdAt: new Date(),
    updatedAt: new Date(),
    search,
    answer,
    lucky,
    language: request.headers['accept-language'] || '',
    browser: request.headers['user-agent'] || '',
    referer: request.headers['referer'] || '',
    ipAddress: requestIp.getClientIp(request) || ''
  }).save();

  request.search = {
    answer,
    redirect
  };

  next();
}