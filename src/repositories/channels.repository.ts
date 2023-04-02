import { CustomRepository } from '../common/decorators/typeorm-ex.decorator';
import { Channels } from '../entities/Channels';
import { Repository } from 'typeorm';
import { Workspaces } from '../entities/Workspaces';
import { NotFoundException } from '@nestjs/common';

@CustomRepository(Channels)
export class ChannelsRepository extends Repository<Channels> {
  async findNameChannel(name, workspace: Workspaces) {
    const channel = await this.createQueryBuilder('channel')
      .where('channel.name = :name', { name: name })
      .andWhere('channel.WorkspaceId = :workspaceId', {
        workspaceId: workspace.id,
      })
      .getOne();
    if (channel) {
      return channel;
    } else {
      throw new NotFoundException('Wrong Channel Name');
    }
  }
}
