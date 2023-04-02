import { CustomRepository } from '../common/decorators/typeorm-ex.decorator';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import { Channels } from '../entities/Channels';

@CustomRepository(ChannelMembers)
export class ChannelMembersRepository extends Repository<ChannelMembers> {
  async checkChannelMembers(user: Users, channel: Channels) {
    return await this.createQueryBuilder()
      .where('ChannelId = :channelId', {
        channelId: channel.id,
      })
      .andWhere('UserId = :userId', { userId: user.id })
      .getExists();
  }
}
