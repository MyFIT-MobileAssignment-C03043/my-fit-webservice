import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateDailyRecordDto {
  @ApiProperty({ description: 'ID người dùng' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Loại bản ghi', enum: ['steps', 'calories', 'sleep', 'water', 'exercise'] })
  @IsEnum(['steps', 'calories', 'sleep', 'water', 'exercise'])
  typeRecord: 'steps' | 'calories' | 'sleep' | 'water' | 'exercise';

  @ApiProperty({ description: 'Giá trị bản ghi, tuỳ theo loại record', example: { intake: 2500 } })
  @IsObject()
  value: any;

  @ApiProperty({ description: 'Ngày tạo bản ghi', example: '2025-04-23' })
  @IsNotEmpty()
  date: Date;
}
