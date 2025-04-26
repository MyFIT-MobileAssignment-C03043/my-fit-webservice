import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ExerciseRecord {
  @Prop({ required: true })
  name: string; // Tên hoạt động

  @Prop({ required: true })
  type: string; // Loại hoạt động (Running, Biking...)

  @Prop()
  duration?: number; // Thời lượng hoạt động (phút)

  @Prop()
  distance?: number; // Khoảng cách (m)

  @Prop()
  note?: string; // Ghi chú
}

export const ExerciseRecordSchema = SchemaFactory.createForClass(ExerciseRecord);
