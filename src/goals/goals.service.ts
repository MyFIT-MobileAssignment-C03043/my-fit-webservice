// src/health/goal.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGoalDto } from './dto/create-goal.dto';
import { Goal, GoalDocument } from './schemas/goals.schema';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalService {
  constructor(@InjectModel(Goal.name) private goalModel: Model<GoalDocument>) {}

  async create(userId: string, createGoalDto: CreateGoalDto): Promise<Goal> {
    const createdGoal = new this.goalModel({ ...createGoalDto, userId });
    return createdGoal.save();
  }

  async findByUserId(userId: string): Promise<Goal[]> {
    return this.goalModel.find({ userId: userId }).exec();
  }

  async findByUserIdAndType(userId: string, type: string): Promise<Goal[]> {
    return this.goalModel
      .find({
        userId: userId,
        type: type,
      })
      .exec();
  }

  async update(
    id: string,
    userId: string,
    updateGoalDto: UpdateGoalDto,
  ): Promise<Goal> {
    const updatedGoal = await this.goalModel.findOneAndUpdate(
      {
        _id: id,
        userId: userId,
      },
      { $set: updateGoalDto },
      { new: true },
    );

    if (!updatedGoal) {
      throw new NotFoundException(`Goal không tồn tại`);
    }

    return updatedGoal;
  }

  async delete(id: string): Promise<any> {
    return this.goalModel.findByIdAndDelete(id);
  }
}
