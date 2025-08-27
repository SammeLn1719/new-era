import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';


@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

}
