import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { HealthService } from './health.service';
import { DailyRecord } from './schemas/daily_records.schema';
import { Goal } from './schemas/goals.schema';
import { User } from './schemas/users.schema';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateDailyRecordDto } from './dto/create-daily-record.dto';
import { CreateGoalDto } from './dto/create-goal.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateDailyRecordDto } from './dto/update-daily-record.dto';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  // Route to add a daily record
  @Post('daily-record')
  @ApiOperation({ summary: 'Tạo bản ghi daily record' })
  @ApiBody({ type: CreateDailyRecordDto })
  @ApiResponse({
    status: 201,
    description: 'Bản ghi daily record được tạo thành công.',
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ.' })
  addDailyRecord(@Body() dailyRecord: DailyRecord) {
    return this.healthService.addDailyRecord(dailyRecord);
  }

  // Route to get all daily records
  @Get('all-daily-records')
  getDailyRecords() {
    return this.healthService.getDailyRecords();
  }

  // Route to get daily records of userId by date
  @ApiQuery({ name: 'userId', required: true, description: 'User ID' })
  @ApiQuery({
    name: 'date',
    required: true,
    description: 'Date in YYYY-MM-DD format',
  })
  @Get('daily-records')
  getDailyRecordByUserAndDate(
    @Query('userId') userId: string,
    @Query('date') date: string,
  ) {
    return this.healthService.getDailyRecordByUserAndDate(userId, date);
  }

  // update daily records
  @Put('daily-records/:id')
  @ApiOperation({ summary: 'Cập nhật bản ghi daily record theo ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID của DailyRecord cần cập nhật (MongoDB _id)',
  })
  @ApiBody({ type: UpdateDailyRecordDto })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công.', type: CreateDailyRecordDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bản ghi.' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ.' })
  updateDailyRecordById(
    @Param('id') id: string,
    @Body()
    updateData: UpdateDailyRecordDto,
  ) {
    return this.healthService.updateDailyRecordById(id, updateData);
  }

  @Delete('daily-records')
  async deleteDailyRecord(
    @Query('userId') userId: string,
    @Query('date') date: string, // Dạng chuỗi ISO 8601 (YYYY-MM-DD)
  ) {
    return this.healthService.deleteDailyRecordByUserIdAndDate(userId, date);
  }

  // Route to add a goal
  @Post('goal')
  @ApiOperation({ summary: 'Tạo mục tiêu cho người dùng' })
  @ApiBody({ type: CreateGoalDto })
  @ApiResponse({ status: 201, description: 'Mục tiêu được tạo thành công.' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ.' })
  addGoal(@Body() goal: Goal) {
    return this.healthService.addGoal(goal);
  }

  // Route to get all goals
  @Get('goals')
  getGoals() {
    return this.healthService.getGoals();
  }

  // Route to get goals by userId
  @Get('goals/:userId')
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  getGoalsByUserId(@Param('userId') userId: string) {
    return this.healthService.getGoalsByUserId(userId);
  }

  ////
  // Route to create a user
  @Post('user')
  @ApiOperation({ summary: 'Tạo người dùng mới' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Người dùng được tạo thành công.' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ.' })
  createUser(@Body() user: User) {
    return this.healthService.createUser(user);
  }

  ////
  // Route to get all users
  @Get('users')
  getUsers() {
    return this.healthService.getUsers();
  }

  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.healthService.getUserById(id);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.healthService.deleteUserById(id);
  }
}
