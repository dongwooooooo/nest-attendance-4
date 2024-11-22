import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  limit?: number | 10;
  @IsOptional()
  @IsNumber()
  offset: number | 0;
  @IsOptional()
  @IsString()
  sort?: string;
  @IsOptional()
  @IsString()
  order?: 'DESC';
}
