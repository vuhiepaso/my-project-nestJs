import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
@WebSocketGateway(8001)
export class EventsGateway {
  @SubscribeMessage('events')
  onEvent(@MessageBody() body: any) {
    console.log(body);
  }
}
