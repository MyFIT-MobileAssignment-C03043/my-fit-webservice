import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StepsRecord {
  @Prop({ required: true })
  current: number; // số bước hiện tại

  @Prop({ required: true })
  target: number; // mục tiêu bước
}

export const StepsRecordSchema = SchemaFactory.createForClass(StepsRecord);
