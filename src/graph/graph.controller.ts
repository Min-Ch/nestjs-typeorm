import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { GraphService } from './graph.service';

@Controller('api/graph')
@UseGuards(JwtAccessGuard)
export class GraphController {
  constructor(private GraphService: GraphService) {}
  @Get('dms/nickname/:nickname')
  getDmsGraphByNickname(@Req() request, @Param('nickname') nickname) {
    return this.GraphService.getDmsGraphByNickname(nickname);
  }
}
