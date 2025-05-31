import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { GoalsService } from 'src/goals/goals.service';
import { GoalModule } from 'src/goals/goals.module';

@Module({
  imports: [
    GoalModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
