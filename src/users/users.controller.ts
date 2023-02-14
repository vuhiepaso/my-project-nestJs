import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Student } from './student';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('student')
  getUsers(): Promise<Student[]> {
    return this.userService.findUsers();
  }

  @Get(':id')
  getUser(@Param() params) {
    return this.userService.findUserById(params.id);
  }

  @Post()
  createUser(@Body() data) {
    this.userService.createUsers(data);
  }
}
