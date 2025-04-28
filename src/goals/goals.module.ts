import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Goal, GoalSchema } from './schemas/goals.schema';
import { GoalController } from './goals.controller';
import { GoalService } from './goals.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }]),
  ],
  controllers: [GoalController],
  providers: [GoalService],
  exports: [GoalService], // Nếu cần sử dụng GoalService ở module khác
})
export class GoalModule {}
