import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AttendanceService } from '../service/attendance.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { PaginationDto } from '@src/util/pagination.dto';
import { Pagination } from '@src/util/decorator.pagination';
import { FindAllAttendanceDto } from '../dto/find-all-attendance.dto';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/')
  @ApiOperation({ summary: '출석' })
  @ApiBody({ type: CreateAttendanceDto })
  @HttpCode(201)
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return await this.attendanceService.create(createAttendanceDto);
  }

  @Post('/find-all')
  @ApiOperation({ summary: '출석 pagination 조회' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '페이지 번호',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: '페이지 크기',
  })
  @ApiBody({ type: FindAllAttendanceDto })
  @HttpCode(200)
  async findAll(
    @Pagination() paginationDto: PaginationDto,
    @Body() attendanceFindAllDto: FindAllAttendanceDto,
  ) {
    return await this.attendanceService.findAll(
      paginationDto,
      attendanceFindAllDto,
    );
  }
}
