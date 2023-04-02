import { Users } from '../entities/Users';
import { Repository } from 'typeorm';
import { JoinRequestDto } from '../users/dto/join.request.dto';
import { CustomRepository } from '../common/decorators/typeorm-ex.decorator';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(Users)
export class UsersRepository extends Repository<Users> {
  async createUser(joinRequestDto: JoinRequestDto) {
    const { password } = joinRequestDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ ...joinRequestDto, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error?.errno === 1062) {
        throw new ConflictException('Existing email');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
