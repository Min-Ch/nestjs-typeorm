import { IsInt } from 'class-validator';

export class DeleteChatsRequestDto {
  @IsInt({ each: true })
  chatIds: number[];
}
