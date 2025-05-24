import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Goal, GoalDocument } from './schemas/goals.schema';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalsService {
  constructor(@InjectModel(Goal.name) private goalModel: Model<GoalDocument>) {}

  async create(userId: string, createGoalDto: CreateGoalDto): Promise<Goal> {
    const goal = await this.goalModel.findOne({ userId }).exec();
    if (goal) {
      throw new BadRequestException(`User has created a goal previous!`);
    }

    const createdGoal = new this.goalModel({
      ...createGoalDto,
      userId: userId,
    });
    return createdGoal.save();
  }

  async findAll(): Promise<Goal[]> {
    return this.goalModel.find().exec();
  }

  async findOne(id: string): Promise<Goal> {
    const goal = await this.goalModel.findById(id).exec();
    if (!goal) throw new NotFoundException(`Goal #${id} not found`);
    return goal;
  }

  async update(id: string, updateGoalDto: UpdateGoalDto): Promise<Goal> {
    const existingGoal = await this.goalModel
      .findByIdAndUpdate(id, updateGoalDto, { new: true })
      .exec();
    if (!existingGoal) throw new NotFoundException(`Goal #${id} not found`);
    return existingGoal;
  }

  async remove(id: string): Promise<Goal> {
    const deletedGoal = await this.goalModel.findByIdAndDelete(id).exec();
    if (!deletedGoal) throw new NotFoundException(`Goal #${id} not found`);
    return deletedGoal;
  }

  async findByUserId(userId: string): Promise<Goal> {
    const goal = await this.goalModel.findOne({ userId }).exec();
    if (!goal)
      throw new NotFoundException(`Goal for userId ${userId} not found`);
    return goal;
  }
}
