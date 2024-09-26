import hbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';

declare global {
  namespace Express {
    interface Request {
      search: {
        answer: string;
        redirect: string;
      };
    }
  }
}

const minify = require('express-minify');
const minifyHTML = require('express-minify-html-2');

import { log } from './shared/log';
import { errorHandler } from './middlewares/error-handler';

import { indexRouter } from './routes/index';

const environment = process.env.NODE_ENV || 'development';
dotenv.config({
  path: path.resolve(__dirname, `../.env.${environment}`)
});
log('Server is running in the ' + environment + ' environment.');

const app: Express = express();

app.use(compression({ threshold: 0 }));
app.use(minify());

app.use(
  minifyHTML({
    override: true,
    exceptionUrls: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
    },
  }),
)

app.engine('hbs', hbs({
  partialsDir: [
    path.join(__dirname, '../views/partials'),
  ],
  extname: 'hbs',
  defaultLayout: 'main'
}));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);

// Catch 404s and forward to error handler
app.use((request: Request, response: Response, next: NextFunction) => {
  next(createError(404, 'The requested resource was not found.'));
});
app.use(errorHandler);

export default app;