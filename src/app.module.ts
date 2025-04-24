import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    HealthModule,  // Đảm bảo bạn đã tạo module này
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
