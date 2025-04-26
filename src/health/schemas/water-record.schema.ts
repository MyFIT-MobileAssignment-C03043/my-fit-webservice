import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class WaterRecord {
  @Prop({ required: true })
  intake: number; // lượng nước uống (ml)

  @Prop()
  time?: string; // thời gian uống
}

export const WaterRecordSchema = SchemaFactory.createForClass(WaterRecord);
