import dotenv from 'dotenv';
import path from 'path';

const environment = process.env.NODE_ENV || 'development';
dotenv.config({
  path: path.resolve(__dirname, `../../.env.${environment}`)
});

import { AppDataSource } from '../app-data-source';

export async function setup() {
  await AppDataSource.initialize();
}