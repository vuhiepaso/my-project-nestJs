import { Module } from '@nestjs/common';
import { EquipmentController } from './controller/equipment/equipment.controller';
import { EquipmentService } from './service/equipment/equipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment1 } from 'entity/equipment1';
@Module({
  imports: [TypeOrmModule.forFeature([Equipment1])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}
