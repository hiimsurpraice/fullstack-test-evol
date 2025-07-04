import {
  IsOptional,
  IsBoolean,
  IsString,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortBy {
  CREATED_AT = 'createdAt',
  DUE_DATE = 'dueDate',
  TITLE = 'title',
}

export class QueryTaskDto {
  @IsOptional()
  @Transform(({ value }) => {
  
  if (value === 'true' || value === true) return true;
  if (value === 'false' || value === false) return false;
  
  return undefined;
})
  completed?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').filter(tag => tag.trim() !== '');
    }
    return value;
  })
  tags?: string[];

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.CREATED_AT;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;

  @IsOptional()
  @Type(() => Number)
  limit?: number = 50;

  @IsOptional()
  @Type(() => Number)
  offset?: number = 0;
}