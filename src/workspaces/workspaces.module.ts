import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmExModule } from '../common/typeorm-ex.module';
import { WorkspacesRepository } from '../repositories/workspaces.repository';
import { WorkspaceMembersRepository } from '../repositories/workspaceMembers.repository';
import { UsersRepository } from '../repositories/users.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      WorkspacesRepository,
      WorkspaceMembersRepository,
      UsersRepository,
    ]),
  ],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
