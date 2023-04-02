import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkspacesRepository } from '../repositories/workspaces.repository';
import { Users } from '../entities/Users';
import { WorkspaceMembersRepository } from '../repositories/workspaceMembers.repository';
import { UsersRepository } from '../repositories/users.repository';
import { Workspaces } from '../entities/Workspaces';

@Injectable()
export class WorkspacesService {
  constructor(
    private readonly workspacesRepository: WorkspacesRepository,
    private readonly workspaceMembersRepository: WorkspaceMembersRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async joinWorkspace(workspace: Workspaces, user: Users) {
    const isJoined =
      await this.workspaceMembersRepository.checkWorkspaceMembers(
        user,
        workspace,
      );
    if (isJoined) {
      throw new ConflictException('이미 참여중인 Workspace');
    }
    return this.workspaceMembersRepository.createWorkspaceMembers(
      user,
      workspace,
    );
  }

  async leftWorkspace(workspace: Workspaces, user: Users) {
    return this.workspaceMembersRepository.deleteWorkspaceMembers(
      user,
      workspace,
    );
  }

  async kickMemberFromWorkspace(workspace: Workspaces, id) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('없는 유저');
    }
    const isJoined =
      await this.workspaceMembersRepository.checkWorkspaceMembers(
        user,
        workspace,
      );
    if (!isJoined) {
      throw new BadRequestException('Workspace에 참여하지 않은 유저');
    }
    return this.workspaceMembersRepository.deleteWorkspaceMembers(
      user,
      workspace,
    );
  }
}
