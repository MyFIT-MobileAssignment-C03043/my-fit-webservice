// src/health/dto/create-goal.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { IsObjectId } from 'src/common/validators/is-object-id.decorator';

export class CreateGoalDto {
  @ApiProperty({ description: 'ID của người dùng' })
  @IsObjectId()
  userId: ObjectId;

  @ApiProperty({ description: 'Loại mục tiêu', enum: ['water', 'steps', 'caloriesIntake', 'caloriesBurned', 'sleep', 'weight', 'height'] })
  @IsEnum(['water', 'steps', 'caloriesIntake', 'caloriesBurned', 'sleep', 'weight', 'height'])
  type: string;

  @ApiProperty({ description: 'Mục tiêu của người dùng', example: 2500 })
  @IsNumber()
  target: number;

  @ApiProperty({ description: 'Đơn vị của mục tiêu', example: 'ml' })
  @IsString()
  unit: string;

  @ApiProperty({ description: 'Ngày bắt đầu mục tiêu' })
  @IsDate()
  startDate: Date;

  @ApiProperty({ description: 'Ngày kết thúc mục tiêu' })
  @IsDate()
  endDate: Date;

  @ApiProperty({ description: 'Trạng thái hoạt động của mục tiêu', example: true })
  @IsBoolean()
  isActive: boolean;
}
