// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from 'src/auth/dto/request/register-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { GoalsService } from 'src/goals/goals.service';
import { CreateGoalDto } from 'src/goals/dto/create-goal.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly goalsService: GoalsService,
  ) {}

  // Tạo mới người dùng
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const createdUser = await new this.userModel(createUserDto).save();

    const createGoalDto: CreateGoalDto = {};
    const userGoals = await this.goalsService.create(
      createdUser._id,
      createGoalDto,
    );

    return createdUser;
  }

  // Tìm người dùng theo email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Hàm tìm tất cả người dùng
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); // Lấy tất cả người dùng
  }

  // Lấy thông tin người dùng theo userId
  async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Cập nhật thông tin người dùng
  async update(
    userId: string,
    updateData: UpdateUserDto, // Sử dụng DTO
  ): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, updateData, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return updatedUser;
  }
}
