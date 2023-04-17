import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway(8001)
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connection', socket.id);
    });
  }

  @SubscribeMessage('events')
  onEvent(@MessageBody() body: any) {
    console.log('onEvent', body);
    this.server.emit('onEvents', {
      msg: 'on events',
      content: body,
    });
  }
}
