import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('123')
  getName() {
    return this.appService.getName();
  }
  @Post('add-student')
  addStudent(@Body() data) {
    console.log(data);
    return data;
  }
}
