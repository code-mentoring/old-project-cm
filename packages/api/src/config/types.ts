export type API_CONFIG = {
  env: Env;
  port: number,
  clientHost: string,

  dbConnection: {
    database: string
    username: string
    password: string
    host: string
    port: number
  };

  oauth: {
    github: {
      appId: string;
      appSecret: string;
    }
  }

  accessTokenSecret: string,

  corsAllowFrom: boolean | string | RegExp | (string | RegExp)[]
};

export enum Env {
  development = 'development',
  production = 'production'
}
