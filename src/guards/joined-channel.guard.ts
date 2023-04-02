import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ChannelMembersRepository } from '../repositories/channelMembers.repository';
import { ChannelsRepository } from '../repositories/channels.repository';

@Injectable()
export class JoinedChannelGuard implements CanActivate {
  constructor(
    private readonly channelMembersRepository: ChannelMembersRepository,
    private readonly channelsRepository: ChannelsRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const name = request.params.name;
    const user = request.user;
    const workspace = request.workspace;
    const channel = await this.channelsRepository.findNameChannel(
      name,
      workspace,
    );
    request.channel = channel;
    return this.channelMembersRepository.checkChannelMembers(user, channel);
  }
}
