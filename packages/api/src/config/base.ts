import { config } from 'dotenv';
import path from 'path';
import { API_CONFIG, Env } from './types';


/*******************************************************************************
 *
 *              ! DO NOT PUT ANYTHING SECURE IN THESE FILES !
 *
 ******************************************************************************/

config({
  path: process.env.ENV || path.resolve(process.cwd(), '.env')
});

export const CONFIG_BASE: Partial<API_CONFIG> = {
  env: process.env.NODE_ENV as Env || Env.production,
  port: parseInt(process.env.PORT!) || 4000,
  clientHost: 'https://codementoring.co',
  dbConnection: {
    database: process.env.DB_DATABASE!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!)
  },
  accessTokenSecret: process.env.JWT_SECRET,

  oauth: {
    github: {
      appId: process.env.GITHUB_APP_ID!,
      appSecret: process.env.GITHUB_APP_SECRET!
    }
  },
};
