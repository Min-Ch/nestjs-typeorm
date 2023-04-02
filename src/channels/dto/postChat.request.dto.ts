import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IdDto } from '../../common/dto/idDto';

export class PostChatRequestDto {
  @IsString()
  type: string;
  @IsString()
  content: string;
  @ValidateNested({ each: true })
  @Type(() => IdDto)
  mentions: IdDto[];
}
