import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment1 } from 'entity/equipment1';
import { Repository } from 'typeorm';
@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment1)
    private equipmentRepository: Repository<Equipment1>,
  ) {}

  async createEquipment(data: Equipment1) {
    return await this.equipmentRepository.save(data);
  }
  listEquipment() {
    console.log('ok');
  }
  updateEquipment() {
    console.log('ok');
  }
  deleteEquipment() {
    console.log('ok');
  }
}
