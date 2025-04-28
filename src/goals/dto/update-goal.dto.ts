// src/health/dto/create-goal.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateGoalDto {
  @ApiProperty({
    description: `Mục tiêu của người dùng.
- Nếu goalType là EXERCISE_HOURS: đơn vị giờ (ex: 3 giờ / ngày)
- STEPS: đơn vị bước (ex: 3000 bước / ngày)
- SLEEPING: đơn vị giờ (ex: 8 giờ / ngày)
- WEIGHT: đơn vị kg (ex: 60 kg)
- BODY_FAT_PERCENTAGE: đơn vị phần trăm % (ex: 23%)
- FOOD: đơn vị calo (ex: 2300 calo)
- ENERGY_BURNED: đơn vị calo (ex: 400 calo)
- WATER: đơn vị ml (ex: 2000 ml)
`,
    example: 2500,
  })
  @IsNumber()
  @IsOptional()
  target?: number;

  @ApiProperty({
    description: 'Ngày bắt đầu mục tiêu',
    example: '2025-05-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: 'Ngày kết thúc mục tiêu',
    example: '2025-06-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    description: 'Trạng thái hoạt động của mục tiêu',
    example: true,
  })
  @IsDateString()
  @IsOptional()
  isActive?: Boolean;
}
