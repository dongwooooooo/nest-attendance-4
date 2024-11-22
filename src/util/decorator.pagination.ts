import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationDto } from './pagination.dto';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationDto => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    const offset = (page - 1) * limit;
    return {
      page,
      limit,
      offset,
      sort: query.sort || 'createAt',
      order: query.order,
    } as PaginationDto;
  },
);
