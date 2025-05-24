import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

class GoalValueDto {
  @IsNumber() value: number;
  @IsString() unit: string;
  @IsString() frequency: string;
}

class SleepingDto {
  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;

  @IsString()
  frequency: string;
}

class WeightGoalDto {
  @IsNumber()
  target: number;

  @IsString()
  unit: string;
}

class PercentageGoalDto {
  @IsNumber()
  target: number;

  @IsString()
  unit: string;
}

export class UpdateGoalDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => GoalValueDto)
  activity_exerciseHours?: GoalValueDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => GoalValueDto)
  activity_steps?: GoalValueDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SleepingDto)
  activity_sleeping?: SleepingDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => WeightGoalDto)
  health_weight?: WeightGoalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PercentageGoalDto)
  health_bodyFatPercentage?: PercentageGoalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => GoalValueDto)
  nutrition_food?: GoalValueDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => GoalValueDto)
  nutrition_energyBurned?: GoalValueDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => GoalValueDto)
  nutrition_water?: GoalValueDto;
}
