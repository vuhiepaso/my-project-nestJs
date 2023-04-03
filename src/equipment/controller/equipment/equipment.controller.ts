import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Response,
  Param,
  ParseIntPipe,
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
  async createEquipment(
    @AuthToken([ADMIN]) userInfo: any,
    @Body() equipment: Equipment1,
    @Response() res: any,
  ) {
    const data = new Equipment1();
    data.id_user = userInfo.id;
    data.name = equipment.name;
    try {
      const dataReq = await this.equipmentService.createEquipment(data);
      return res.status(200).json({
        status: 200,
        message: 'Create successfully',
        data: dataReq,
      });
    } catch (error) {
      return res.status(400).json({
        error,
        message: 'Create fail',
      });
    }
  }
  //READING
  @Get('/list')
  async listEquipment(
    @AuthToken([ADMIN, USER]) userInfo: any,
    @Response() res: any,
  ) {
    try {
      const data = await this.equipmentService.listEquipment(userInfo.id);
      return res.status(200).json({
        status: 200,
        message: 'Request successfully',
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        error,
        message: 'Request fail',
      });
    }
  }
  //UPDATE
  @Patch('/update/:id')
  async updateEquipment(
    @AuthToken([ADMIN, USER]) userInfo: any,
    @Body() equipment: Equipment1,
    @Param('id', ParseIntPipe) id: number,
    @Response() res: any,
  ) {
    try {
      const data = new Equipment1();
      data.id = id;
      data.status = equipment.status;
      if (userInfo.role === ADMIN) {
        data.name = equipment.name;
        data.isActive = equipment.isActive;
      }
      const dataRq = await this.equipmentService.updateEquipment(data);
      return res.status(200).json({
        dataRq,
        status: 200,
        message: 'Request successfully',
      });
    } catch (error) {
      return res.status(400).json({
        error,
        message: 'Request fail',
      });
    }
  }
  //DELETE
  @Delete('/delete/:id')
  async deleteEquipment(
    @AuthToken([ADMIN]) userInfo: any,
    @Param('id') id: number,
    @Response() res: any,
  ) {
    try {
      await this.equipmentService.deleteEquipment(id);
      return res.status(200).json({
        status: 200,
        message: 'Request successfully',
      });
    } catch (error) {
      return res.status(400).json({
        error,
        message: 'Request fail',
      });
    }
  }
}
