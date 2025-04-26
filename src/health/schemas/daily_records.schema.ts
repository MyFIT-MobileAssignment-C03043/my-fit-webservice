import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { StepsRecordSchema } from './steps-record.schema';
import { CaloriesRecordSchema } from './calories-record.schema';
import { SleepRecordSchema } from './sleep-record.schema';
import { WaterRecordSchema } from './water-record.schema';
import { ExerciseRecordSchema } from './exercise-record.schema';

export type DailyRecordDocument = DailyRecord & Document;

@Schema()
export class DailyRecord {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: ['steps', 'calories', 'sleep', 'water', 'exercise'] })
  typeRecord: 'steps' | 'calories' | 'sleep' | 'water' | 'exercise';

  @Prop({
    type: MongooseSchema.Types.Mixed,
    required: true
  })
  value: any; 
  //cần để type Mixed vì value sẽ tùy thuộc vào typeRecord

  @Prop({ required: true })
  date: Date;
}

export const DailyRecordSchema = SchemaFactory.createForClass(DailyRecord);

