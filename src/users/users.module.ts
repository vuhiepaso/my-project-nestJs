import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
