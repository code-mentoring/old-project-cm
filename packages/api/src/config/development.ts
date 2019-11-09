/*******************************************************************************
 *
 *              ! DO NOT PUT ANYTHING SECURE IN THESE FILES !
 *
 ******************************************************************************/
import { CONFIG_BASE } from './base';
import { API_CONFIG, Env } from './types';

export const CONFIG_DEVELOPMENT: API_CONFIG = {
  ...CONFIG_BASE as API_CONFIG,
  env: Env.development,
  corsAllowFrom: true,
  clientHost: 'http://localhost:8080',
  dbConnection: {
    database: process.env.DB_DATABASE || 'codementoring',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432
  },
  accessTokenSecret: 'dev-secret'
};
