import { CustomRepository } from '../common/decorators/typeorm-ex.decorator';
import { DMs } from '../entities/DMs';
import { Repository } from 'typeorm';

@CustomRepository(DMs)
export class DmsRepository extends Repository<DMs> {}
