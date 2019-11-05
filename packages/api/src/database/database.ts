import path from 'path';
import { DataType, Sequelize, Sequelize as TSSequelize, SequelizeOptions } from 'sequelize-typescript';

import { CONFIG } from '../config';
import { logger } from '../lib/logger';
import { Env } from '../config/types';

export let db: Sequelize;
// @ts-ignore
Sequelize.Promise = global.Promise

const options: SequelizeOptions = {
  ...CONFIG.dbConnection,
  dialect: 'postgres',
  logging: false,
  modelPaths: [
    path.resolve(__dirname, '../models/**/!(BaseModel)*'),
  ],
  define: {
    paranoid: true
  },
  pool: {}
};


export const setupDatabase = async (database?: string) => {
  if (database) options.database = database;
  if (CONFIG.env === Env.development) {
    options.storage = path.resolve(process.cwd(), '../../codementoring.db')
    options.dialect = 'sqlite'
  }


  db = new TSSequelize(options);
  db.beforeDefine(attrs => {
    // Define default ID on all models
    attrs.id = {
      autoIncrement: true,
      primaryKey: true,
      type: DataType.BIGINT
    };
  });

  try {
    await db.authenticate();
    logger.info('✅ Database connected');
  } catch (e) {
    logger.error('Unable to connect to the database:', e.message);
  }

  await db.sync({ alter: true, });

  return db;
};
