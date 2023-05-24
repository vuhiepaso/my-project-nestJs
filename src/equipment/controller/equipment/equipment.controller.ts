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
  OnModuleInit,
} from '@nestjs/common';

import { AuthToken } from 'common/decorator/validate.token';
import { ADMIN, USER } from 'common/role';
import { Equipment1 } from 'entity/equipment1';
import { EquipmentService } from 'src/equipment/service/equipment/equipment.service';
import { io, Socket } from 'socket.io-client';
@Controller('equipment')
export class EquipmentController implements OnModuleInit {
  public socketClient: Socket;
  constructor(private equipmentService: EquipmentService) {
    this.socketClient = io(process.env.HOST_SOCKET || 'http://localhost:8001', {
      auth: {
        secret: process.env.KEY_SECRET,
      },
    });
  }
  onModuleInit() {
    this.socketClient.on('connect', () => {
      // console.log('connect');
    });
  }

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
      this.socketClient.emit('events', 'CREATE');
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
      const data = await this.equipmentService.listAllEquipment();
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
      this.socketClient.emit('events', 'UPDATE');
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
      this.socketClient.emit('events', 'DELETE');
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
