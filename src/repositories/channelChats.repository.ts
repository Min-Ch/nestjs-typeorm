import { CustomRepository } from '../common/decorators/typeorm-ex.decorator';
import { ChannelChats } from '../entities/ChannelChats';
import { Repository } from 'typeorm';
import { PageRequestDto } from '../common/dto/page.request.dto';
import { Channels } from '../entities/Channels';
import { Users } from '../entities/Users';

@CustomRepository(ChannelChats)
export class ChannelChatsRepository extends Repository<ChannelChats> {
  async findChats(channel: Channels, pagination: PageRequestDto) {
    return await this.createQueryBuilder('chat')
      .where('chat.ChannelId = :channelId', {
        channelId: channel.id,
      })
      .orderBy('-id')
      .skip(pagination.offset)
      .take(pagination.size)
      .getMany();
  }

  async createChat(channel: Channels, user: Users, content: string) {
    const chat = this.create({
      content: content,
      UserId: user.id,
      ChannelId: channel.id,
    });
    return await this.save(chat);
  }

  async deleteChat(channel: Channels, user: Users, chatIds: number[]) {
    return this.createQueryBuilder()
      .delete()
      .from(ChannelChats)
      .where('ChannelId = :channelId', { channelId: channel.id })
      .andWhere('UserId = :userId', { userId: user.id })
      .andWhereInIds(chatIds)
      .execute();
  }
}
