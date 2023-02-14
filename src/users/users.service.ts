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
  async findUserById(msv: number): Promise<Student> {
    console.log(msv);
    return await this.userRepository.findOne({
      where: {
        msv: msv,
      },
    });
    // return await this.userRepository.findOneBy({ msv });
  }
  createUsers(data) {}
}
