import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class FindAllAttendanceDto {
  @IsNotEmpty()
  @IsNumber()
  @Length(10)
  @ApiProperty({
    description: '학번',
    example: 20230000,
  })
  readonly studentNumber: number;
}
