import { PartialType } from '@nestjs/swagger';
import { CreateDailyRecordDto } from './create-daily-record.dto';

// UpdateDailyRecordDto kế thừa tất cả các trường từ CreateDailyRecordDto,
// nhưng chúng đều được đánh dấu là tùy chọn (@IsOptional())
// và giữ nguyên các validation decorators ban đầu.
export class UpdateDailyRecordDto extends PartialType(CreateDailyRecordDto) {}