import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class GoalValueDto {
  @ApiProperty({ example: 1500, description: 'Mức giá trị mục tiêu' })
  @IsNumber()
  value: number;

  @ApiProperty({ example: 'steps', description: 'Đơn vị của giá trị' })
  @IsString()
  unit: string;

  @ApiProperty({ example: 'daily', description: 'Tần suất thực hiện' })
  @IsString()
  frequency: string;
}

class SleepingDto {
  @ApiProperty({
    example: '2025-05-24T22:00:00Z',
    description: 'Thời gian bắt đầu ngủ',
    format: 'date-time',
  })
  @IsDateString()
  start: Date;

  @ApiProperty({
    example: '2025-05-25T06:00:00Z',
    description: 'Thời gian kết thúc ngủ',
    format: 'date-time',
  })
  @IsDateString()
  end: Date;

  @ApiProperty({ example: 'daily', description: 'Tần suất ngủ' })
  @IsString()
  frequency: string;
}

class WeightGoalDto {
  @ApiProperty({ example: 65, description: 'Trọng lượng mục tiêu' })
  @IsNumber()
  target: number;

  @ApiProperty({ example: 'kg', description: 'Đơn vị trọng lượng' })
  @IsString()
  unit: string;
}

class PercentageGoalDto {
  @ApiProperty({ example: 15, description: 'Tỉ lệ phần trăm mục tiêu' })
  @IsNumber()
  target: number;

  @ApiProperty({ example: '%', description: 'Đơn vị tỉ lệ phần trăm' })
  @IsString()
  unit: string;
}

export class CreateGoalDto {
  @ApiPropertyOptional({ type: GoalValueDto, description: 'Giờ tập thể dục' })
  @IsOptional()
  @ValidateNested()
  @Type(() => GoalValueDto)
  activity_exerciseHours?: GoalValueDto;

  @ApiPropertyOptional({ type: GoalValueDto, description: 'Số bước chân' })
  @IsOptional()
  @ValidateNested()
  @Type(() => GoalValueDto)
  activity_steps?: GoalValueDto;

  @ApiPropertyOptional({ type: SleepingDto, description: 'Giấc ngủ' })
  @IsOptional()
  @ValidateNested()
  @Type(() => SleepingDto)
  activity_sleeping?: SleepingDto;

  @ApiPropertyOptional({
    type: WeightGoalDto,
    description: 'Mục tiêu cân nặng',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => WeightGoalDto)
  health_weight?: WeightGoalDto;

  @ApiPropertyOptional({
    type: PercentageGoalDto,
    description: 'Mục tiêu tỉ lệ mỡ cơ thể',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PercentageGoalDto)
  health_bodyFatPercentage?: PercentageGoalDto;

  @ApiPropertyOptional({
    type: GoalValueDto,
    description: 'Mục tiêu dinh dưỡng: thức ăn',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => GoalValueDto)
  nutrition_food?: GoalValueDto;

  @ApiPropertyOptional({
    type: GoalValueDto,
    description: 'Mục tiêu dinh dưỡng: năng lượng đốt cháy',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => GoalValueDto)
  nutrition_energyBurned?: GoalValueDto;

  @ApiPropertyOptional({
    type: GoalValueDto,
    description: 'Mục tiêu dinh dưỡng: lượng nước uống',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => GoalValueDto)
  nutrition_water?: GoalValueDto;
}
