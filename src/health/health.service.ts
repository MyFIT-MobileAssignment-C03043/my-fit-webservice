import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  DailyRecord,
  DailyRecordDocument,
} from './schemas/daily_records.schema';
import { Goal, GoalDocument } from './schemas/goals.schema';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import * as moment from 'moment';

@Injectable()
export class HealthService {
  constructor(
    @InjectModel(DailyRecord.name) private dailyRecordModel: Model<DailyRecordDocument>,
    @InjectModel(Goal.name) private goalModel: Model<GoalDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  

  // Method to add a daily record
  async addDailyRecord(dailyRecord: DailyRecord): Promise<DailyRecord> {
    const createdRecord = new this.dailyRecordModel(dailyRecord);
    return createdRecord.save();
  }
  
  async updateDailyRecordById(id: string, value: any): Promise<DailyRecord | null> {
    return this.dailyRecordModel.findByIdAndUpdate(
      id,
      { $set: { value } },
      { new: true },
    ).exec();
  }

  // Method to get all daily records
  async getDailyRecordsByUser(userId: string): Promise<DailyRecord[]> {
    return this.dailyRecordModel.find({userId}).exec();
  }

  async getDailyRecordByUserAndDate(userId: string, date: string) {
    const start = moment(date).startOf('day').toDate();
    const end = moment(date).endOf('day').toDate();

    return this.dailyRecordModel.find({
      userId,
      date: { $gte: start, $lte: end },
    });
  }

  async deleteDailyRecordByUserIdAndDate(userId: string, date: string): Promise<{ deleted: boolean }> {
    const result = await this.dailyRecordModel.deleteOne({
      userId,
      date: { $gte: moment(date).startOf('day').toDate(), $lte: moment(date).endOf('day').toDate() },
    }).exec();
    return { deleted: result.deletedCount === 1 };
  }

  // Method to add a goal
  async addGoal(goal: Goal): Promise<Goal> {
    const createdGoal = new this.goalModel(goal);
    return createdGoal.save();
  }

  // Method to get all goals
  async getGoals(): Promise<Goal[]> {
    return this.goalModel.find().exec();
  }

  ////
  // Method to get all goals by userId
  async getGoalsByUserId(userId: string) {
    return this.goalModel.find({ userId });
  }

  // Method to create a user
  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  // Method to get all users
  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async deleteUserById(id: string): Promise<{ deleted: boolean }> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    return { deleted: result.deletedCount === 1 };
  }
}
