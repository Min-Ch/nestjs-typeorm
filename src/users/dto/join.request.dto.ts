import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JoinRequestDto {
  @ApiProperty({
    example: 'test@email.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  public email: string;

  @ApiProperty({
    example: '테스트',
    description: '닉네임',
    required: true,
  })
  @IsString()
  public nickname: string;

  @ApiProperty({
    example: 'test1234',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  public password: string;
}
