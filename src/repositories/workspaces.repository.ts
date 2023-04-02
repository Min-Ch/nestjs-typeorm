import { CustomRepository } from '../common/decorators/typeorm-ex.decorator';
import { Workspaces } from '../entities/Workspaces';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CustomRepository(Workspaces)
export class WorkspacesRepository extends Repository<Workspaces> {
  async findUrlWorkspace(url) {
    const workspace = await this.createQueryBuilder('workspace')
      .where('workspace.url = :url', {
        url: url,
      })
      .getOne();
    if (workspace) {
      return workspace;
    } else {
      throw new NotFoundException('Wrong url');
    }
  }
}
