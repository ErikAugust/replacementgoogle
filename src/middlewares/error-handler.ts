import { Request, Response, NextFunction } from 'express';

import { logError } from '../shared/log';
import { config } from '../shared/config';

export function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {
  logError(error);
  response.status(error.status || 500);
  
  if (request.originalUrl.startsWith('/dist')) {
    return response.send();
  }
  if (request.originalUrl.startsWith('/api')) {
    return response.json({ message: error.message });
  } else {
    error.status = error.status || 500;
    if (error.status === 500) {
      error.message = 'An unexpected error occurred. Please try again later.';
    }
    return response.render(
      'error', 
      { 
        ...config,
        title: error.status.toString(), 
        status: error.status.toString(), 
        message: error.message 
      }
    );
  }
}