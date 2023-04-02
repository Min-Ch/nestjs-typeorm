import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { TypeOrmExModule } from '../common/typeorm-ex.module';
import { WorkspacesRepository } from '../repositories/workspaces.repository';
import { WorkspaceMembersRepository } from '../repositories/workspaceMembers.repository';
import { UsersRepository } from '../repositories/users.repository';
import { ChannelMembersRepository } from '../repositories/channelMembers.repository';
import { ChannelsRepository } from '../repositories/channels.repository';
import { ChannelChatsRepository } from '../repositories/channelChats.repository';
import { MentionsRepository } from '../repositories/mentions.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      WorkspacesRepository,
      WorkspaceMembersRepository,
      UsersRepository,
      ChannelMembersRepository,
      ChannelsRepository,
      ChannelChatsRepository,
      MentionsRepository,
    ]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}
