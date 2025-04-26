import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GoalDocument = Goal & Document;

@Schema()
export class Goal {
  @Prop()
  userId: string;

  @Prop()
  type: 
    | 'exerciseHours' 
    | 'steps' 
    | 'sleeping' 
    | 'weight' 
    | 'bodyFatPercentage' 
    | 'food' 
    | 'energyBurned' 
    | 'water';

  @Prop()
  target: number;

  @Prop()
  unit: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

  @Prop()
  isActive: boolean;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
