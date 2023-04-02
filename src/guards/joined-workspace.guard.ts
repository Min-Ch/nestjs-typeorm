import { ExecutionContext, Injectable } from '@nestjs/common';
import { ValidWorkspaceGuard } from './valid-workspace.guard';
import { WorkspaceMembersRepository } from '../repositories/workspaceMembers.repository';
import { WorkspacesRepository } from '../repositories/workspaces.repository';

@Injectable()
export class JoinedWorkspaceGuard extends ValidWorkspaceGuard {
  constructor(
    private readonly workspaceRepository: WorkspacesRepository,
    private readonly workspaceMembersRepository: WorkspaceMembersRepository,
  ) {
    super(workspaceRepository);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (await super.canActivate(context)) {
      const request = context.switchToHttp().getRequest();
      return this.workspaceMembersRepository.checkWorkspaceMembers(
        request.user,
        request.workspace,
      );
    } else {
      return false;
    }
  }
}
