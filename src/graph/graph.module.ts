import { Module } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphController } from './graph.controller';
import { TypeOrmExModule } from '../common/typeorm-ex.module';
import { DmsRepository } from '../repositories/dms.repository';
import { UsersRepository } from '../repositories/users.repository';
import { WorkspacesRepository } from '../repositories/workspaces.repository';
import { WorkspaceMembersRepository } from '../repositories/workspaceMembers.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      DmsRepository,
      UsersRepository,
      WorkspacesRepository,
      WorkspaceMembersRepository,
    ]),
  ],
  providers: [GraphService],
  controllers: [GraphController],
})
export class GraphModule {}
