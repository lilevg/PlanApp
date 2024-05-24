import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Plan } from '../plan/entities/plan.entity';
import { CreatePlansTable1622741234567 } from '../migrations/1715200194351-CreatePlansTable';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  entities: [Plan],
  migrations: [CreatePlansTable1622741234567],
  synchronize: false,
  migrationsRun: true,
});
