import { CustomRepository } from '../common/decorators/typeorm-ex.decorator';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import { Workspaces } from '../entities/Workspaces';

@CustomRepository(WorkspaceMembers)
export class WorkspaceMembersRepository extends Repository<WorkspaceMembers> {
  async checkWorkspaceMembers(user: Users, workspace: Workspaces) {
    return await this.createQueryBuilder()
      .where('WorkspaceId = :workspaceId', {
        workspaceId: workspace.id,
      })
      .andWhere('UserId=:userId', { userId: user.id })
      .getExists();
  }
  async createWorkspaceMembers(user: Users, workspace: Workspaces) {
    await this.createQueryBuilder()
      .insert()
      .into(WorkspaceMembers)
      .values({ UserId: user.id, WorkspaceId: workspace.id })
      .execute();
  }

  async deleteWorkspaceMembers(user: Users, workspace: Workspaces) {
    await this.createQueryBuilder()
      .delete()
      .where('WorkspaceId = :workspaceId', {
        workspaceId: workspace.id,
      })
      .andWhere('UserId=:userId', { userId: user.id })
      .execute();
  }
}
