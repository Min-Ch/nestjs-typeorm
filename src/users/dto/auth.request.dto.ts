import { PickType } from '@nestjs/swagger';
import { JoinRequestDto } from './join.request.dto';

export class AuthCredentialDto extends PickType(JoinRequestDto, [
  'email',
  'password',
] as const) {}
