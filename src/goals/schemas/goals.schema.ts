import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GoalType } from '../enums/goal-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export type GoalDocument = Goal & Document;

@Schema({ timestamps: true }) // Tự động thêm createdAt và updatedAt
export class Goal extends Document {
  @ApiProperty({
    description: 'ID của người dùng',
    example: '60d6f9f5f5b0a75b6c3b8e4e', // Ví dụ về một ID người dùng
  })
  @Prop({ required: true })
  userId: string;

  @ApiProperty({
    description: 'Loại mục tiêu',
    enum: GoalType,
    example: 'steps',
  })
  @Prop({ required: true })
  type: GoalType;

  @ApiProperty({
    description: 'Mục tiêu của người dùng',
    example: 2500,
  })
  @Prop({ required: true })
  target: number;

  @ApiProperty({
    description: 'Ngày bắt đầu mục tiêu',
    example: '2025-05-01T00:00:00.000Z',
  })
  @Prop({ required: true })
  startDate: Date;

  @ApiProperty({
    description: 'Ngày kết thúc mục tiêu',
    example: '2025-06-01T00:00:00.000Z',
  })
  @Prop({ required: true })
  endDate: Date;

  @ApiProperty({
    description: 'Trạng thái hoạt động của mục tiêu',
    example: true,
  })
  @Prop({ required: true, default: true })
  isActive: Boolean;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
