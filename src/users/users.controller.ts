import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { AuthCredentialDto } from './dto/auth.request.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  // @ApiResponse({
  //   type: UserDto,
  // })
  // @ApiOperation({ summary: '내 정보 조회' })
  // @Get()
  // getUsers(@User() user) {
  //   return user;
  // }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  postUsers(@Body() body: JoinRequestDto) {
    return this.UsersService.postUsers(body);
  }

  @ApiResponse({
    status: 201,
    description: '성공',
  })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() body: AuthCredentialDto) {
    return this.UsersService.logIn(body);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req) {
    const user = req.user;
    console.log(user);
    return this.UsersService.refreshTokens(user);
  }
  //
  // @ApiOperation({ summary: '로그아웃' })
  // @Post('logout')
  // logOut(@Req() req, @Res() res) {
  //   req.logOut();
  //   res.clearCookie('connect.sid', { httpOnly: true });
  //   res.send('ok');
  // }
}
