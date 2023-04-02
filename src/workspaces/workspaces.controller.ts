import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { GetUser } from '../common/decorators/user.decorator';
import { WorkspacesService } from './workspaces.service';
import { OwnerWorkspaceGuard } from '../guards/owner-workspace.guard';
import { ValidWorkspaceGuard } from '../guards/valid-workspace.guard';
import { JoinedWorkspaceGuard } from '../guards/joined-workspace.guard';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
@UseGuards(JwtAccessGuard)
export class WorkspacesController {
  constructor(private WorkspacesService: WorkspacesService) {}
  // @Get()
  // getMyWorkspaces() {}
  //
  // @Post()
  // createWorkspace() {}
  //
  // @Get(':url/members')
  // getAllMembersFromWorkspace() {}
  //
  // @Post(':url/members')
  // inviteMembersToWorkspace() {}
  //
  //
  // @Get(':url/members/:id')
  // getMemberInfoInWorkspace() {}

  @Post(':url')
  @UseGuards(ValidWorkspaceGuard)
  joinWorkspace(@Req() request, @GetUser() user) {
    return this.WorkspacesService.joinWorkspace(request.workspace, user);
  }

  @Delete(':url')
  @UseGuards(JoinedWorkspaceGuard)
  leftWorkspace(@Req() request, @GetUser() user) {
    return this.WorkspacesService.leftWorkspace(request.workspace, user);
  }

  @Delete(':url/members/:id')
  @UseGuards(OwnerWorkspaceGuard)
  kickMemberFromWorkspace(@Req() request, @Param('id', ParseIntPipe) id) {
    return this.WorkspacesService.kickMemberFromWorkspace(
      request.workspace,
      id,
    );
  }
}
