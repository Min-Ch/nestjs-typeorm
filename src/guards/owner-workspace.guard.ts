import { ExecutionContext, Injectable } from '@nestjs/common';
import { ValidWorkspaceGuard } from './valid-workspace.guard';

@Injectable()
export class OwnerWorkspaceGuard extends ValidWorkspaceGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (await super.canActivate(context)) {
      const request = context.switchToHttp().getRequest();
      return request.workspace.OwnerId === request.user.id;
    } else {
      return false;
    }
  }
}
