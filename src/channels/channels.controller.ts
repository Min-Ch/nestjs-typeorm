import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { JoinedWorkspaceGuard } from '../guards/joined-workspace.guard';
import { JoinedChannelGuard } from '../guards/joined-channel.guard';
import { ChannelsService } from './channels.service';
import { PageRequestDto } from '../common/dto/page.request.dto';
import { PostChatRequestDto } from './dto/postChat.request.dto';
import { GetUser } from '../common/decorators/user.decorator';
import { DeleteChatsRequestDto } from './dto/deleteChats.request.dto';

@ApiTags('CHANNEL')
@Controller('api/workspaces/:url/channels')
@UseGuards(JoinedWorkspaceGuard)
@UseGuards(JwtAccessGuard)
export class ChannelsController {
  constructor(private readonly ChannelsService: ChannelsService) {}
  // @Get()
  // getAllChannels() {}
  //
  // @Post()
  // createChannels() {}
  //
  // @Get(':name')
  // getSpecificChannel() {}
  //
  //
  // @Get(':name/members')
  // getAllMembers() {}
  //
  // @Post(':name/members')
  // inviteMembers() {}

  @Get(':name/chats')
  @UseGuards(JoinedChannelGuard)
  getChat(@Req() request, @Query() pagination: PageRequestDto) {
    return this.ChannelsService.getChat(request.channel, pagination);
  }

  @Post(':name/chats')
  @UseGuards(JoinedChannelGuard)
  postChat(@Req() request, @GetUser() user, @Body() body: PostChatRequestDto) {
    return this.ChannelsService.postChat(request.channel, user, body);
  }

  @Delete(':name/chats')
  @UseGuards(JoinedChannelGuard)
  deleteChats(
    @Req() request,
    @GetUser() user,
    @Body() body: DeleteChatsRequestDto,
  ) {
    return this.ChannelsService.deleteChats(
      request.channel,
      user,
      body.chatIds,
    );
  }
}
