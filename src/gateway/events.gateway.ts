import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EquipmentService } from 'src/equipment/service/equipment/equipment.service';
import { ValidatorToke } from 'common/decorator/validate.token';
@WebSocketGateway(8001, { cors: true })
export class EventsGateway
  implements OnModuleInit, OnGatewayDisconnect, OnGatewayConnection
{
  constructor(private equipmentService: EquipmentService) {}
  @WebSocketServer()
  server: Server;
  //connection
  onModuleInit() {
    // this.server.on('connection', (socket) => {
    //   console.log('Client connection', socket.id);
    // });
  }
  //connection
  handleConnection(client: any) {
    const { token, secret } = client.handshake.auth;
    const isSaverConnect = secret == process.env.KEY_SECRET ? true : false;
    if (!ValidatorToke(token) && !isSaverConnect) {
      client.disconnect();
    } else console.log(`Client Connection: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('events')
  async onEvent(@MessageBody() body: any) {
    let data = [];
    try {
      data = await this.equipmentService.listAllEquipment();
    } catch (error) {}
    this.server.emit('onEvents', {
      name: 'data return',
      content: body,
      data,
    });
  }
}
