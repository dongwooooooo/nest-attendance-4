import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

@Controller('student')
export class studentController {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'user 더미 생성' })
  @ApiBody({ type: CreateStudentDto })
  @HttpCode(201)
  async create(@Body() dto: CreateStudentDto) {
    return await this.studentRepository.save(
      this.studentRepository.create({
        name: dto.name,
        department: dto.department,
        studentNumber: dto.studentNumber,
      }),
    );
  }
}
