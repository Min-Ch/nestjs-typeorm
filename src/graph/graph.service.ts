import { Injectable } from '@nestjs/common';
import { DmsRepository } from '../repositories/dms.repository';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class GraphService {
  constructor(
    private readonly dmsRepository: DmsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getDmsGraphByNickname(nickname: string) {
    const rawResult = await this.usersRepository
      .createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.nickname', 'nickname')
      .addSelect('COUNT(DISTINCT sender.id)', 'senderCount')
      .addSelect('COUNT(DISTINCT receiver.id)', 'receiverCount')
      .leftJoin('user.DMs', 'sender')
      .leftJoin('user.1', 'test')
      .leftJoin('user.DMs2', 'receiver')
      .leftJoin('user.Workspaces', 'workspaces')
      // .where('nickname like :nickname', { nickname: `%${nickname}%` })
      .groupBy('user.id')
      // .orderBy({
      //   'user.nickname': 'ASC',
      //   'user.createdAt': 'ASC',
      //   'COUNT(DISTINCT sender.id)': 'ASC',
      //   'COUNT(DISTINCT receiver.id)': 'ASC',
      // })
      .getRawMany();
    // console.log(rawResult[0]);
    const result = rawResult;
    // const result = rawResult.map((item) => ({
    //   ...item,
    //   senderCount: parseInt(item.senderCount),
    //   receiverCount: parseInt(item.receiverCount),
    // }));

    // const result = await this.usersRepository
    //   .createQueryBuilder('user')
    //   .select('user.id')
    //   .addSelect('user.nickname')
    //   .addSelect('user.nickname', 'nickname')
    //   .loadRelationCountAndMap('user.senderCount', 'user.DMs')
    //   .loadRelationCountAndMap('user.receiverCount', 'user.DMs2')
    //   .where('user.nickname like :nickname', { nickname: `%${nickname}%` })
    //   .orderBy({
    //     'user.nickname': 'ASC',
    //     'user.createdAt': 'ASC',
    //   })
    //   .getMany();
    //
    // console.log(result[0]);

    return { result };
  }
}
