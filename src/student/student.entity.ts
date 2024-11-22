import { Attendance } from '@src/attendance/entity/attendance.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['studentNumber'])
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  department: string;
  @Column()
  studentNumber: number;

  @OneToMany(() => Attendance, (attendance) => attendance.student, {
    cascade: true,
  })
  attendances: Attendance[];
}
