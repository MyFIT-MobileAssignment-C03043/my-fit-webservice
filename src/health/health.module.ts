import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { DailyRecord, DailyRecordSchema } from './schemas/daily_records.schema';
import { Goal, GoalSchema } from './schemas/goals.schema';
import { User, UserSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyRecord.name, schema: DailyRecordSchema },
      { name: Goal.name, schema: GoalSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
