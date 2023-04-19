import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EquipmentModule } from 'src/equipment/equipment.module';

@Module({
  imports: [EquipmentModule],
  providers: [EventsGateway],
})
export class EventsModule {}
