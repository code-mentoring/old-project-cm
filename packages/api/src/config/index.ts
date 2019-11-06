export enum Env {
  development = 'development',
  production = 'production'
}

import { CONFIG_DEVELOPMENT } from './development';
import { CONFIG_PRODUCTION } from './production';
import { API_CONFIG } from './types';


const CONFIGS: { [env in Env]: API_CONFIG } = {
  development: CONFIG_DEVELOPMENT,
  production: CONFIG_PRODUCTION
};

export const CONFIG = CONFIGS[process.env.NODE_ENV as Env || Env.development];
