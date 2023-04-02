import { Injectable } from '@nestjs/common';
import { ChannelChatsRepository } from '../repositories/channelChats.repository';
import { ChannelsRepository } from '../repositories/channels.repository';
import { ChannelMembersRepository } from '../repositories/channelMembers.repository';
import { Channels } from '../entities/Channels';
import { PageRequestDto } from '../common/dto/page.request.dto';
import { PageResponseDto } from '../common/dto/page.response.dto';
import { ChannelChats } from '../entities/ChannelChats';
import { PostChatRequestDto } from './dto/postChat.request.dto';
import { Users } from '../entities/Users';
import { MentionsRepository } from '../repositories/mentions.repository';

@Injectable()
export class ChannelsService {
  constructor(
    private readonly channelsRepository: ChannelsRepository,
    private readonly channelMembersRepository: ChannelMembersRepository,
    private readonly channelChatsRepository: ChannelChatsRepository,
    private readonly mentionsRepository: MentionsRepository,
  ) {}

  async getChat(
    channel: Channels,
    pagination: PageRequestDto,
  ): Promise<PageResponseDto<ChannelChats>> {
    const total = await this.channelChatsRepository.countBy({
      ChannelId: channel.id,
    });
    const chats = await this.channelChatsRepository.findChats(
      channel,
      pagination,
    );
    return new PageResponseDto(total, pagination.size, chats);
  }

  async postChat(channel: Channels, user: Users, body: PostChatRequestDto) {
    if (body.type === 'message') {
      const chat = await this.channelChatsRepository.createChat(
        channel,
        user,
        body.content,
      );
      for (const mention of body.mentions) {
        await this.mentionsRepository.createMention(
          'chat',
          channel.WorkspaceId,
          chat.id,
          user.id,
          mention.id,
        );
      }
    }
  }

  async deleteChats(channel: Channels, user: Users, chatIds: number[]) {
    const deleted = await this.channelChatsRepository.deleteChat(
      channel,
      user,
      chatIds,
    );
    return { result: `${deleted.affected}개 삭제됨` };
  }
}
