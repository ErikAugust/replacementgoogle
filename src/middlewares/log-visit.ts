import { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';

import { log } from '../shared/log';
import { Visit } from '../entities/visit.entity';

export function logVisit(page: string = '') {
  return async (request: Request, response: Response, next: NextFunction) => {
    if (!page) {
      page = request.originalUrl;
    }
    const data = {
      page,
      language: request.headers['accept-language'] || '',
      browser: request.headers['user-agent'] || '',
      referer: request.headers['referer'] || '',
      ipAddress: requestIp.getClientIp(request) || ''
    };

    log('New visit: ' + JSON.stringify(data, null, 2));

    const visit = Visit.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await visit.save();

    next();
  }
}