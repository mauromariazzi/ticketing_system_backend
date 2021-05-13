import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST } from './constants';
import { databaseConfig } from './database.config';
import { Ticket } from './tickets/ticket.entity';

dotenv.config();

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Ticket]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
