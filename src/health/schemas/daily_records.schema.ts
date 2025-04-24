import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DailyRecordDocument = DailyRecord & Document;

@Schema()
export class DailyRecord {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  waterIntake: number;

  @Prop()
  steps: number;

  @Prop()
  caloriesIntake: number;

  @Prop()
  sleepHours: number;
}

export const DailyRecordSchema = SchemaFactory.createForClass(DailyRecord);
