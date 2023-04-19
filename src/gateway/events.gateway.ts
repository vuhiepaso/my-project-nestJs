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
    console.log(`Client Connection: ${client.id}`);
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
