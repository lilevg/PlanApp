import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { CreateTableUsers1712919469135 } from './migrations/1712919469135-CreateTableUsers';
import { EmailModule } from './email/email.module';
import { QueueModule } from './queues/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      migrationsRun: true,
      synchronize: false,
      migrations: [],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // dropSchema: true,
    }),
    UserModule,
    QueueModule,
  ],
})
export class AppModule {}
