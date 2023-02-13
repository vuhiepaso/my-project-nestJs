import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Student) private userRepository: Repository<Student>,
  ) {}

  async findUsers(): Promise<Student[]> {
    return await this.userRepository.find();
  }
  createUsers(data) {}
}
