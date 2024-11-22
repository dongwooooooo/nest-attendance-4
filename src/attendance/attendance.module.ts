import { Module } from '@nestjs/common';
import { AttendanceService } from './service/attendance.service';
import { AttendanceController } from './controller/attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from '@src/attendance/entity/attendance.entity';
import { StudentModule } from '@src/student/student.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance]), StudentModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
