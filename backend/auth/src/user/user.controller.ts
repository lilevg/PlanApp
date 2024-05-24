import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  async login(@Body() userLoginDto: LoginUserDto) {
    const user = await this.userService.login(userLoginDto);
    return user;
  }

  @Get(':userId')
  async getUser(@Param('userId') id: string) {
    return await this.userService.getUser(id);
  }

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(userId, updateUserDto);
  }
}
