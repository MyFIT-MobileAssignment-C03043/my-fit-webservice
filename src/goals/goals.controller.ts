// src/health/goal.controller.ts
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateGoalDto } from './dto/create-goal.dto';
import { GoalService } from './goals.service';
import { Goal } from './schemas/goals.schema';
import { GoalType } from './enums/goal-type.enum';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateGoalDto } from './dto/update-goal.dto';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @UseGuards(JwtAuthGuard) // Dùng guard để xác thực người dùng
  @Post()
  @ApiOperation({ summary: 'Tạo mới mục tiêu cho người dùng' })
  @ApiBearerAuth()
  @ApiBody({
    description: 'Mục tiêu cần đặt',
    type: CreateGoalDto,
    examples: {
      example1: {
        description: 'Tạo mục tiêu Số bước đi (per day)',
        value: {
          type: GoalType.STEPS,
          target: 3000,
          startDate: '2025-05-01T00:00:00.000Z',
          endDate: '2025-06-01T00:00:00.000Z',
        },
      },
      example2: {
        description: 'Tạo mục tiêu Số giờ ngủ (per day) đi',
        value: {
          type: GoalType.SLEEPING,
          target: 8,
          startDate: '2025-05-01T00:00:00.000Z',
          endDate: '2025-06-01T00:00:00.000Z',
        },
      },
      example3: {
        description: 'Tạo mục tiêu Số giờ tập thể dụng (per day) đi',
        value: {
          type: GoalType.EXERCISE_HOURS,
          target: 3,
          startDate: '2025-05-01T00:00:00.000Z',
          endDate: '2025-06-01T00:00:00.000Z',
        },
      },
    },
  })
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createGoalDto: CreateGoalDto,
  ): Promise<Goal> {
    const userId = req.user.userId;
    return this.goalService.create(userId, createGoalDto);
  }

  @UseGuards(JwtAuthGuard) // Dùng guard để xác thực người dùng
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách goal theo userId' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Danh sách các goal', type: [Goal] })
  async getGoalsByUserId(
    @Request() req: AuthenticatedRequest,
  ): Promise<Goal[]> {
    const userId = req.user.userId;
    return this.goalService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard) // Dùng guard để xác thực người dùng
  @Get(':type')
  @ApiOperation({ summary: 'Lấy danh sách goal theo userId' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Danh sách các goal', type: [Goal] })
  @ApiParam({ name: 'type', description: 'Loại goal muốn lấy' })
  async getGoalsByUserIdAndType(
    @Request() req: AuthenticatedRequest,
    @Param('type') type: string,
  ): Promise<Goal[]> {
    const userId = req.user.userId;
    return this.goalService.findByUserIdAndType(userId, type);
  }

  @UseGuards(JwtAuthGuard) // Dùng guard để xác thực người dùng
  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật mục tiêu theo ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'ID của Goal cần cập nhật' })
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
  ): Promise<Goal> {
    const userId = req.user.userId;
    return this.goalService.update(id, userId, updateGoalDto);
  }
}
