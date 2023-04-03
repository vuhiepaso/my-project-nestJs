import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment1 } from 'entity/equipment1';
import { Repository } from 'typeorm';
import { Equal } from 'typeorm';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment1)
    private equipmentRepository: Repository<Equipment1>,
  ) {}

  // CREATE EQUIPMENT
  async createEquipment(data: Equipment1) {
    return await this.equipmentRepository.save(data);
  }

  // LIST EQUIPMENT
  async listEquipment(userId: number) {
    return await this.equipmentRepository.findBy({
      id_user: Equal(userId),
    });
  }

  // UPDATE EQUIPMENT
  async updateEquipment(equipment: Equipment1) {
    let foundEquipment = await this.findEquipment(equipment.id);
    foundEquipment = { ...foundEquipment, ...equipment };
    console.log('abc', foundEquipment);
    // return await this.equipmentRepository.save(foundEquipment);
    return equipment;
  }

  // DELETE EQUIPMENT
  async deleteEquipment(id: number) {
    await this.findEquipment(id);
    return await this.equipmentRepository.softDelete(id);
  }

  // FIND ONE BY ID
  async findEquipment(id: number): Promise<Equipment1> {
    const foundEquipment = await this.equipmentRepository.findOneBy({
      id: id,
    });
    if (!foundEquipment) {
      throw new HttpException(
        `Equipment with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return foundEquipment;
  }
}
