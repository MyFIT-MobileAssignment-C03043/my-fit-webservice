// src/health/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEmail, IsDate } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Tên người dùng' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email người dùng' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Tuổi người dùng' })
  @IsNumber()
  age: number;

  @ApiProperty({ description: 'Giới tính người dùng' })
  @IsString()
  gender: string;

  @ApiProperty({ description: 'Chiều cao người dùng (cm)', example: 170 })
  @IsNumber()
  height: number;

  @ApiProperty({ description: 'Cân nặng người dùng (kg)', example: 60 })
  @IsNumber()
  weight: number;

  @ApiProperty({ description: 'Ngày tạo tài khoản người dùng' })
  @IsDate()
  createdAt: Date;
}
