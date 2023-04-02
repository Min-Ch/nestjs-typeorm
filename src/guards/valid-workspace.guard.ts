import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WorkspacesRepository } from '../repositories/workspaces.repository';

@Injectable()
export class ValidWorkspaceGuard implements CanActivate {
  constructor(private readonly workspacesRepository: WorkspacesRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const url = request.params.url;
    const workspace = await this.workspacesRepository.findUrlWorkspace(url);
    request.workspace = workspace;
    return Boolean(workspace);
  }
}
