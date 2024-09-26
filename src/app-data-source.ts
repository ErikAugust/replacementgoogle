import { DataSource } from 'typeorm';
import 'reflect-metadata';

import { Visit } from './entities/visit.entity';
import { Search } from './entities/search.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Visit, Search],
    logging: true,
    synchronize: true,
    extra: {
        charset: 'utf8mb4_unicode_ci'
    }
});