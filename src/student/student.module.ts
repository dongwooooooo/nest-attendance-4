import { Module } from '@nestjs/common';
import { studentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [studentController],
  exports: [TypeOrmModule],
})
export class StudentModule {}
