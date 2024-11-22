import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttendanceState } from './attendance.state';
import { Student } from '@src/student/student.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'enum',
    enum: AttendanceState,
    default: AttendanceState.ABSENT,
  })
  state: AttendanceState;
  @CreateDateColumn()
  attendAt: Date;

  @ManyToOne(() => Student, (student) => student.attendances, {
    onDelete: 'CASCADE',
  })
  student: Student;
}
