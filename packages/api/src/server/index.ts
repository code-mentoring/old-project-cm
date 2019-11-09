import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http, { Server } from 'http';

import { CONFIG } from '../config';
import { setupDatabase } from '../database/database';
import { logger } from '../lib/logger';
import { apollo } from './middleware/apollo';
import { github } from './middleware/oauth/github';


let httpServer: Server;

export const startServer = async (
  port: number = CONFIG.port,
  database?: string
) => {

  const db = await setupDatabase(database);

  const app = express();
  httpServer = http.createServer(app);

  app.use(cors({
    origin: CONFIG.corsAllowFrom
  }));
  app.use(helmet({
    xssFilter: true
  }));
  apollo(app, httpServer);

  app.use(github.router);

  await new Promise(res => httpServer.listen(port, res));

  logger.info(`🚀 Server ready at http://localhost:${port}/graphql`);
  return { httpServer, db };
};


// File is called from command line
if (require.main === module) startServer();
