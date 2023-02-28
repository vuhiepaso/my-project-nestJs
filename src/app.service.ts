import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!sssssssssssssaaaaa';
  }
  getName(): object {
    return {
      name: 'hiep',
    };
  }
}
