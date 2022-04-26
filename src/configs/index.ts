import dotenv from 'dotenv';
import { CONFIGS } from './configs.enum';
import { defaultConfigs } from './defaultConfigs';

dotenv.config();

export class AppConfigs {
  static getValue(config: CONFIGS) {
    return process.env[config] ?? defaultConfigs[config];
  }

  static getIntValue(config: CONFIGS): number {
    return parseInt(this.getValue(config) || '');
  }

  static ensureRequiredConfigs() {
    for (const config of Object.keys(CONFIGS)) {
      if (this.getValue(<CONFIGS>config) === undefined) {
        throw new Error(`Config error - missing env.${config}`);
      }
    }
  }

  static getMongoDBConnectionString(): string {
    return [
      'mongodb:/',
      `${this.getValue(CONFIGS.DB_HOST)}:${this.getValue(CONFIGS.DB_PORT)}`,
      this.getValue(CONFIGS.DB_NAME),
    ].join('/');
  }
}
