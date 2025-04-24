// src/health/dto/create-daily-record.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';
import { IsObjectId } from 'src/common/validators/is-object-id.decorator';

export class CreateDailyRecordDto {
  @ApiProperty({ description: 'ID của người dùng' })
  @IsObjectId()
  userId: ObjectId;

  @ApiProperty({ description: 'Ngày của bản ghi', example: '2025-04-23' })
  @IsDate()
  date: Date;

  @ApiProperty({ description: 'Lượng nước uống (ml)', example: 2500 })
  @IsNumber()
  waterIntake: number;

  @ApiProperty({ description: 'Số bước đi', example: 8000 })
  @IsNumber()
  steps: number;

  @ApiProperty({ description: 'Lượng calo đã tiêu thụ', example: 2200 })
  @IsNumber()
  caloriesIntake: number;

  @ApiProperty({ description: 'Số giờ ngủ', example: 7 })
  @IsNumber()
  sleepHours: number;
}
