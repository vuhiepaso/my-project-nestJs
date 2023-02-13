import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Student } from './student';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers(): Promise<Student[]> {
    return this.userService.findUsers();
  }

  @Post()
  createUser(@Body() data) {
    this.userService.createUsers(data);
  }
}
