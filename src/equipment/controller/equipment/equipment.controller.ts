import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';

import { AuthToken } from 'common/decorator/validate.token';
import { ADMIN, USER } from 'common/role';
import { Equipment1 } from 'entity/equipment1';
@Controller('equipment')
export class EquipmentController {
  //   constructor() {}

  //CREATE
  @Post()
  createEquipment(
    @AuthToken([ADMIN]) payload: any,
    @Body() equipment1: Equipment1,
  ) {
    console.log('equipment1', equipment1);
    console.log('payload', payload);
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
