import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SleepRecord {
  @Prop({ required: true })
  startTime: string; // Giờ bắt đầu ngủ (ví dụ: "23:00")

  @Prop({ required: true })
  endTime: string; // Giờ kết thúc ngủ (ví dụ: "06:30")

  @Prop({ required: true })
  totalHours: number; // Tổng giờ ngủ
}

export const SleepRecordSchema = SchemaFactory.createForClass(SleepRecord);
        