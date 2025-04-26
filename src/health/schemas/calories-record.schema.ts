import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CaloriesRecord {
  @Prop({ required: true })
  intake: number; // lượng calories nạp

  @Prop()
  mealName?: string; // tên bữa ăn

  @Prop()
  mealType?: string; // loại bữa ăn (Breakfast, Lunch...)
}

export const CaloriesRecordSchema = SchemaFactory.createForClass(CaloriesRecord);
