import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Role } from 'src/auth/role/roles.enum';
import { Goal } from './schemas/goals.schema';
import { CreateGoalDto } from './dto/create-goal.dto';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Tạo goals của người dùng hiện tại' })
  @ApiBody({ type: CreateGoalDto })
  @ApiCreatedResponse({
    description: 'Goal created successfully',
    schema: {
      example: {
        _id: '647c0f3a4b5a2d1234567890',
        userId: 'user12345',
        activity_exerciseHours: {
          value: 2,
          unit: 'hours',
          frequency: 'daily',
        },
        activity_steps: {
          value: 5000,
          unit: 'steps',
          frequency: 'daily',
        },
        activity_sleeping: {
          start: '2025-05-24T22:00:00.000Z',
          end: '2025-05-25T06:00:00.000Z',
          frequency: 'daily',
        },
        health_weight: {
          target: 70,
          unit: 'kg',
        },
        health_bodyFatPercentage: {
          target: 15,
          unit: '%',
        },
        nutrition_food: {
          value: 300,
          unit: 'grams',
          frequency: 'daily',
        },
        nutrition_energyBurned: {
          value: 2000,
          unit: 'kcal',
          frequency: 'daily',
        },
        nutrition_water: {
          value: 2,
          unit: 'liters',
          frequency: 'daily',
        },
        createdAt: '2025-05-24T12:34:56.789Z',
        updatedAt: '2025-05-25T12:34:56.789Z',
      },
    },
  })
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createGoalDto: CreateGoalDto,
  ): Promise<Goal> {
    const userId = req.user.userId;
    return this.goalsService.create(userId, createGoalDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard) // Kết hợp JwtAuthGuard và RolesGuard
  @Roles(Role.ADMIN) // Chỉ admin mới có quyền truy cập
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả goals (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách goals được trả về thành công.',
    schema: {
      example: [
        {
          _id: '647c0f3a4b5a2d1234567890',
          userId: 'user12345',
          activity_exerciseHours: {
            value: 2,
            unit: 'hours',
            frequency: 'daily',
          },
          activity_steps: {
            value: 5000,
            unit: 'steps',
            frequency: 'daily',
          },
          activity_sleeping: {
            start: '2025-05-24T22:00:00.000Z',
            end: '2025-05-25T06:00:00.000Z',
            frequency: 'daily',
          },
          createdAt: '2025-05-24T12:34:56.789Z',
          updatedAt: '2025-05-25T12:34:56.789Z',
        },
        {
          _id: '647c0f3a4b5a2d1234567890',
          userId: 'user12345',
          activity_exerciseHours: {
            value: 2,
            unit: 'hours',
            frequency: 'daily',
          },
          nutrition_food: {
            value: 300,
            unit: 'grams',
            frequency: 'daily',
          },
          nutrition_energyBurned: {
            value: 2000,
            unit: 'kcal',
            frequency: 'daily',
          },
          nutrition_water: {
            value: 2,
            unit: 'liters',
            frequency: 'daily',
          },
          createdAt: '2025-05-24T12:34:56.789Z',
          updatedAt: '2025-05-25T12:34:56.789Z',
        },
      ],
    },
  })
  findAll() {
    return this.goalsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Lấy goals của người dùng hiện tại' })
  @ApiResponse({
    status: 200,
    description: 'Goals của người dùng được trả về thành công.',
    schema: {
      example: {
        _id: '647c0f3a4b5a2d1234567890',
        userId: 'user12345',
        activity_exerciseHours: {
          value: 2,
          unit: 'hours',
          frequency: 'daily',
        },
        activity_steps: {
          value: 5000,
          unit: 'steps',
          frequency: 'daily',
        },
        activity_sleeping: {
          start: '2025-05-24T22:00:00.000Z',
          end: '2025-05-25T06:00:00.000Z',
          frequency: 'daily',
        },
        health_weight: {
          target: 70,
          unit: 'kg',
        },
        health_bodyFatPercentage: {
          target: 15,
          unit: '%',
        },
        nutrition_food: {
          value: 300,
          unit: 'grams',
          frequency: 'daily',
        },
        nutrition_energyBurned: {
          value: 2000,
          unit: 'kcal',
          frequency: 'daily',
        },
        nutrition_water: {
          value: 2,
          unit: 'liters',
          frequency: 'daily',
        },
        createdAt: '2025-05-24T12:34:56.789Z',
        updatedAt: '2025-05-25T12:34:56.789Z',
      },
    },
  })
  findByUserId(@Request() req: AuthenticatedRequest) {
    const userId = req.user.userId; // Lấy userId từ JWT
    return this.goalsService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Lấy một goal theo ID' })
  @ApiParam({ name: 'id', description: 'ID của goal cần lấy' })
  @ApiResponse({
    status: 200,
    description: 'Goals của người dùng được trả về thành công.',
    schema: {
      example: {
        _id: '66503fef0e50d6206ad7b217',
        userId: '123456',
        activity_exerciseHours: {
          value: 45,
          unit: 'minutes',
          frequency: 'daily',
        },
        activity_sleeping: { start: '23:00', end: '07:00', frequency: 'daily' },
        health_weight: { target: 60, unit: 'kg' },
        nutrition_water: { value: 2, unit: 'liters', frequency: 'daily' },
        createdAt: '2025-05-20T09:00:00Z',
        updatedAt: '2025-05-24T08:45:00Z',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.goalsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật goal theo ID' })
  @ApiParam({ name: 'id', description: 'ID của goal cần cập nhật' })
  @ApiBody({
    description: 'Thông tin goal cần cập nhật',
    type: UpdateGoalDto,
    examples: {
      fullExample: {
        summary: 'Ví dụ đầy đủ',
        value: {
          activity_exerciseHours: {
            value: 30,
            unit: 'minutes',
            frequency: 'daily',
          },
          activity_sleeping: {
            start: '22:00',
            end: '06:00',
            frequency: 'daily',
          },
          health_weight: { target: 65, unit: 'kg' },
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Goal được cập nhật thành công.' })
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(id, updateGoalDto);
  }
}
