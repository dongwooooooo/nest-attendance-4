import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: '학생 이름',
    example: '홍길동',
    minLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  @Length(5)
  readonly name: string;

  @ApiProperty({
    description: '학과',
    example: '정보통신공학과',
    minLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  @Length(10)
  readonly department: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '학번',
    example: 20230000,
  })
  readonly studentNumber: number;
}
