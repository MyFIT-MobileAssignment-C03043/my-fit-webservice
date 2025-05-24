import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HealthMetricRecord } from './schemas/health-metric-record.schema';
import { CreateHealthMetricRecordDto } from './dto/create-health-metric-record.dto';
import { UpdateHealthMetricRecordDto } from './dto/update-health-metric-record.dto';
import { MetricType } from './enums/metric-type.enum';
import { UserService } from 'src/users/users.service';

@Injectable()
export class HealthMetricsService {
  constructor(
    @InjectModel(HealthMetricRecord.name)
    private readonly healthMetricRecordModel: Model<HealthMetricRecord>,

    private readonly userService: UserService,
  ) {}

  async create(
    createDto: CreateHealthMetricRecordDto,
    userId: string,
  ): Promise<HealthMetricRecord> {
    const createdRecord = await new this.healthMetricRecordModel({
      ...createDto,
      userId,
    }).save();

    if (
      createdRecord.metricType === MetricType.HEIGHT ||
      createdRecord.metricType === MetricType.WEIGHT
    ) {
      // 1. Lấy bản ghi mới nhất hiện có của user với cùng metricType (height hoặc weight)
      const latestRecord = await this.healthMetricRecordModel
        .findOne({
          userId,
          metricType: createdRecord.metricType,
        })
        .sort({ date: -1 }) // sắp xếp giảm dần theo date, lấy bản ghi mới nhất
        .exec();

      // 2. So sánh xem updatedRecord có phải là bản ghi mới nhất
      const isLatest =
        latestRecord &&
        createdRecord.date.getTime() === latestRecord.date.getTime();

      if (isLatest && createdRecord.value !== undefined) {
        if (createdRecord.metricType === MetricType.WEIGHT) {
          await this.userService.update(userId, {
            weight: createdRecord.value,
          });
        }
        if (createdRecord.metricType === MetricType.HEIGHT) {
          await this.userService.update(userId, {
            height: createdRecord.value,
          });
        }
      }
    }

    return createdRecord;
  }

  async findById(id: string): Promise<HealthMetricRecord | null> {
    return this.healthMetricRecordModel.findById(id).exec();
  }

  async update(
    id: string,
    userId: string,
    updateDto: UpdateHealthMetricRecordDto,
  ): Promise<HealthMetricRecord> {
    // Tìm bản ghi và đảm bảo người dùng có quyền cập nhật
    const record = await this.healthMetricRecordModel.findOne({
      _id: id,
      userId,
    });

    if (!record) {
      throw new NotFoundException('Không tìm thấy bản ghi.');
    }

    // Kiểm tra xem nếu là loại 'calories', 'exercise' thì cho phép cập nhật các detail
    if (record.metricType !== 'calories') {
      // Nếu là calorie thì kiểm tra và cập nhật mealDetails
      if (updateDto.mealDetails) {
        throw new BadRequestException(
          `Meal details là bắt buộc với loại chỉ số calories, không phải của loại chỉ số ${record.metricType}`,
        );
      }
    }

    if (record.metricType !== 'exercise') {
      // Nếu là exercise thì kiểm tra và cập nhật exerciseDetails
      if (updateDto.exerciseDetails) {
        throw new BadRequestException(
          `Exercise details là bắt buộc với loại chỉ số exercise, không phải của loại chỉ số ${record.metricType}`,
        );
      }
    }

    // Cập nhật bản ghi và trả về bản ghi sau khi đã được cập nhật
    const updatedRecord = await this.healthMetricRecordModel
      .findOneAndUpdate(
        { _id: id, userId }, // Điều kiện tìm kiếm
        { $set: updateDto }, // Dữ liệu cập nhật
        { new: true }, // Trả về bản ghi sau khi cập nhật
      )
      .exec();

    if (!updatedRecord) {
      throw new NotFoundException('Không tìm thấy bản ghi.');
    }

    if (
      updatedRecord.metricType === MetricType.HEIGHT ||
      updatedRecord.metricType === MetricType.WEIGHT
    ) {
      // 1. Lấy bản ghi mới nhất hiện có của user với cùng metricType (height hoặc weight)
      const latestRecord = await this.healthMetricRecordModel
        .findOne({
          userId,
          metricType: updatedRecord.metricType,
        })
        .sort({ date: -1 }) // sắp xếp giảm dần theo date, lấy bản ghi mới nhất
        .exec();

      // 2. So sánh xem updatedRecord có phải là bản ghi mới nhất
      const isLatest =
        latestRecord &&
        updatedRecord.date.getTime() === latestRecord.date.getTime();

      if (isLatest && updateDto.value !== undefined) {
        if (updatedRecord.metricType === MetricType.WEIGHT) {
          await this.userService.update(userId, {
            weight: updatedRecord.value,
          });
        }
        if (updatedRecord.metricType === MetricType.HEIGHT) {
          await this.userService.update(userId, {
            height: updatedRecord.value,
          });
        }
      }
    }

    return updatedRecord;
  }

  async delete(id: string, userId: string): Promise<any> {
    // Xoá record theo ID
    const result = await this.healthMetricRecordModel
      .findByIdAndDelete(id)
      .exec();

    if (!result) {
      throw new NotFoundException(
        `Health Metric Record with id ${id} not found`,
      );
    }

    console.log('result: ', result);

    if (
      result.metricType === MetricType.HEIGHT ||
      result.metricType === MetricType.WEIGHT
    ) {
      // 1. Lấy bản ghi mới nhất hiện có của user với cùng metricType (height hoặc weight)
      const latestRecord = await this.healthMetricRecordModel
        .findOne({
          userId,
          metricType: result.metricType,
        })
        .sort({ date: -1 }) // sắp xếp giảm dần theo date, lấy bản ghi mới nhất
        .exec();

      console.log('latestRecord: ', latestRecord);

      // 2. So sánh xem updatedRecord có phải là bản ghi mới nhất
      const isLatest =
        latestRecord && result.date.getTime() >= latestRecord.date.getTime();

      console.log('isLatest: ', isLatest);

      if (isLatest) {
        if (latestRecord.metricType === MetricType.WEIGHT) {
          await this.userService.update(userId, {
            weight: latestRecord.value,
          });
        }
        if (latestRecord.metricType === MetricType.HEIGHT) {
          await this.userService.update(userId, {
            height: latestRecord.value,
          });

          console.log('UP');
        }
      }
    }

    return { message: 'Record deleted successfully' };
  }

  async findByUserIdAndDate(
    userId: string,
    date: Date,
  ): Promise<HealthMetricRecord[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0)); // Bắt đầu ngày
    const endOfDay = new Date(date.setHours(23, 59, 59, 999)); // Kết thúc ngày

    const records = await this.healthMetricRecordModel
      .find({
        userId: userId,
        date: { $gte: startOfDay, $lte: endOfDay }, // Lọc theo ngày
      })
      .sort({ date: -1 })
      .exec();

    return records; // Trả về kết quả (có thể là mảng rỗng nếu không có record nào)
  }

  async findByUserIdAndMetricTypeAndDate(
    userId: string,
    metricType: string,
    date: Date,
  ): Promise<HealthMetricRecord[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0)); // Bắt đầu ngày
    const endOfDay = new Date(date.setHours(23, 59, 59, 999)); // Kết thúc ngày

    const records = await this.healthMetricRecordModel
      .find({
        userId: userId,
        metricType: metricType, // Lọc theo loại chỉ số sức khoẻ
        date: { $gte: startOfDay, $lte: endOfDay }, // Lọc theo ngày
      })
      .sort({ date: -1 })
      .exec();

    return records; // Trả về kết quả (có thể là mảng rỗng nếu không có record nào)
  }

  async findAll(): Promise<HealthMetricRecord[]> {
    return await this.healthMetricRecordModel.find().exec();
  }

  async findByUserId(userId: string): Promise<HealthMetricRecord[]> {
    return await this.healthMetricRecordModel
      .find({ userId })
      .sort({ date: -1 })
      .exec();
  }

  // Lấy các HealthMetricRecord theo metricType trong một khoảng thời gian start đến end
  async findByUserIdAndMetricTypeAndDateRange(
    userId: string,
    metricType: string,
    startDate: Date,
    endDate: Date,
  ): Promise<HealthMetricRecord[]> {
    const start = new Date(startDate.setHours(0, 0, 0, 0)); // Đầu ngày của startDate
    const end = new Date(endDate.setHours(23, 59, 59, 999)); // Cuối ngày của endDate

    const records = await this.healthMetricRecordModel
      .find({
        userId,
        metricType,
        date: { $gte: start, $lte: end },
      })
      .sort({ date: -1 })
      .exec();

    return records;
  }
}
