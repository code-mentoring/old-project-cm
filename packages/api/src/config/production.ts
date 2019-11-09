import { CONFIG_BASE } from './base';
import { API_CONFIG, Env } from './types';

/*******************************************************************************
 *
 *              ! DO NOT PUT ANYTHING SECURE IN THESE FILES !
 *
 ******************************************************************************/


export const CONFIG_PRODUCTION: API_CONFIG = {
  ...CONFIG_BASE as API_CONFIG,
  env: Env.production,
  corsAllowFrom: [/codementoring\.co$/]
};
