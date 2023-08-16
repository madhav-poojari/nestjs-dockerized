import { Body, Controller, Get, Post ,Query} from '@nestjs/common';
import { Observable } from 'rxjs';
import { runInThisContext } from 'vm';
import { UserI } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    add(@Body() user: UserI): Observable<UserI> {
        return this.userService.add(user);
    }
    @Get('has-liked')
  async hasUserLikedContent(
    @Query('user_id') user_id: string,
    @Query('content_id') content_id: string,
  ) {
    const hasLiked = await this.userService.hasUserLikedContent(user_id, content_id);
    return { hasLiked };
  }

    @Get()
    findAll(): Observable<UserI[]> {
        return this.userService.findAll();
    }
}
