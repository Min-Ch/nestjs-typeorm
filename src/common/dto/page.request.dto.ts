import { Min, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PageRequestDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(1)
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(0)
  size?: number = 10;

  get offset(): number {
    return (this.page - 1) * this.size;
  }
}
