import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Student } from '@src/student/student.entity';
import { checkAttendanceState } from '../entity/attendance.state';
import { FindAllAttendanceDto } from '../dto/find-all-attendance.dto';
import { PaginationDto } from '@src/util/pagination.dto';
import { Attendance } from '@src/attendance/entity/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async create(createAttendanceDto: CreateAttendanceDto) {
    const now = new Date();
    const student = await this.studentRepository.findOneBy({
      studentNumber: createAttendanceDto.studentNumber,
    });
    if (student == undefined) {
      throw new BadRequestException('[ERROR] 존재하지 않는 학생입니다.');
    }
    const state = checkAttendanceState(now);

    const savedAttendance = await this.attendanceRepository.save(
      this.attendanceRepository.create({
        state: state,
        student: student,
      }),
    );
    if (savedAttendance == undefined) {
      throw new BadRequestException(
        '[ERROR] 출석 체크 오류, 다시 시도해주세요.',
      );
    }
    return {
      id: savedAttendance.id,
      attendanceTime: savedAttendance.attendAt,
      status: savedAttendance.state,
      user: savedAttendance.student,
    };
  }

  async findAll(
    paginationDto: PaginationDto,
    findAllAttendanceDto: FindAllAttendanceDto,
  ) {
    const { offset, limit, order } = paginationDto;
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const [attendances, attendanceCount] =
      await this.attendanceRepository.findAndCount({
        where: {
          student: { studentNumber: findAllAttendanceDto.studentNumber },
          attendAt: Between(thirtyDaysAgo, now),
        },
        relations: ['student'],
        order: { attendAt: order as 'ASC' | 'DESC' },
        skip: offset,
        take: limit,
      });
    const formattedAttendances = formatAttendance();

    const currentPage = Math.ceil(offset / limit) + 1;
    const totalPages = Math.ceil(attendanceCount / limit);

    return {
      data: formattedAttendances,
      page: currentPage,
      totalPages: totalPages,
      limit,
    };

    function formatAttendance() {
      return attendances.map((attendance) => ({
        id: attendance.id,
        attendanceTime: attendance.attendAt,
        status: attendance.state,
        userId: attendance.student.id,
        user: {
          id: attendance.student.id,
          name: attendance.student.name,
          department: attendance.student.department,
          studentId: attendance.student.studentNumber,
        },
      }));
    }
  }
}
