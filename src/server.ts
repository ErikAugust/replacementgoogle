import app from './app';
import { AppDataSource } from './app-data-source';
import { log } from './shared/log';

const port = process.env.PORT || 3000;

async function startServer() {
  await AppDataSource.initialize();
  app.listen(port, () => {
    log(`Server is running at http://localhost:${port}.`);
  });
}

startServer();