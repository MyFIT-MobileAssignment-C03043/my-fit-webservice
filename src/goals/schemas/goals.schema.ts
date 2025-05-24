// src/goals/goal.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GoalDocument = Goal & Document;

@Schema({ _id: false })
class GoalValue {
  @Prop({ required: true }) value: number;
  @Prop({ required: true }) unit: string;
  @Prop({ required: true }) frequency: string;
}

@Schema({ _id: false })
class Sleeping {
  @Prop({ required: true }) start: Date;
  @Prop({ required: true }) end: Date;
  @Prop({ required: true }) frequency: string;
}

@Schema({ _id: false })
class WeightGoal {
  @Prop() target: number;
  @Prop({ required: true }) unit: string;
}

@Schema({ _id: false })
class PercentageGoal {
  @Prop({ required: true }) target: number;
  @Prop({ required: true }) unit: string;
}

@Schema()
export class Goal {
  @Prop({ required: true }) userId: string;

  @Prop({ type: GoalValue, required: false }) // optional
  activity_exerciseHours?: GoalValue;

  @Prop({ type: GoalValue, required: false })
  activity_steps?: GoalValue;

  @Prop({ type: Sleeping, required: false })
  activity_sleeping?: Sleeping;

  @Prop({ type: WeightGoal, required: false })
  health_weight?: WeightGoal;

  @Prop({ type: PercentageGoal, required: false })
  health_bodyFatPercentage?: PercentageGoal;

  @Prop({ type: GoalValue, required: false })
  nutrition_food?: GoalValue;

  @Prop({ type: GoalValue, required: false })
  nutrition_energyBurned?: GoalValue;

  @Prop({ type: GoalValue, required: false })
  nutrition_water?: GoalValue;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
