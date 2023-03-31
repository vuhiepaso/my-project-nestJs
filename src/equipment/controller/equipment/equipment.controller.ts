import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Response,
} from '@nestjs/common';

import { AuthToken } from 'common/decorator/validate.token';
import { ADMIN, USER } from 'common/role';
import { Equipment1 } from 'entity/equipment1';
import { EquipmentService } from 'src/equipment/service/equipment/equipment.service';
@Controller('equipment')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  //CREATE
  @Post()
  createEquipment(
    @AuthToken([ADMIN]) payload: any,
    @Body() equipment: Equipment1,
    @Response() res: any,
  ) {
    const data = new Equipment1();
    data.id_user = payload.id;
    data.name = equipment.name;
    this.equipmentService.createEquipment(data);
    return res.status(200).json({
      data,
      payload,
    });
  }
  //READING
  @Get('/list')
  listEquipment(@AuthToken([ADMIN, USER]) payload: any) {
    console.log('payload', payload);
  }
  //UPDATE
  @Patch('/update')
  updateEquipment(@AuthToken([ADMIN, USER]) payload: any) {
    console.log('payload', payload);
  }
  //DELETE
  @Delete('/delete')
  deleteEquipment(@AuthToken([ADMIN]) payload: any) {
    console.log('payload', payload);
  }
}
