import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ApiResponseFactory } from '../security/ApiResponseFactory';
import { PropertyService } from '../service/property.service';
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import {RoleEnum} from "../model/enum/RoleEnum";
import {Roles} from "../security/decorator/RoleDecorator";
import {RoleGuard} from "../security/guard/RoleGuard";
import {UpdatePropertyDto} from "../model/dto/property/UpdatePropertyDto";
import {ContextUser} from "../security/decorator/ContextUser";
import {User} from "../model/entity/User";
import {CreatePropertyDto} from "../model/dto/property/CreatePropertyDto";

@Controller('properties')
@ApiTags('Properties')
export class PropertyController {
  constructor(
    private readonly apiResponseFactory: ApiResponseFactory,
    private readonly propertyService: PropertyService,
  ) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async createProperty(
      @ContextUser() user: User,
      @Body() dto: CreatePropertyDto,
      @Res() response: Response,
  ): Promise<any> {
    const createdProperty = await this.propertyService.createProperty(dto, user);
    return this.apiResponseFactory.success(createdProperty, 'Property successfully created', response);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getPropertyById(
    @Res() response: Response,
    @Param('id') id: string,
  ): Promise <any> {
    const property = await this.propertyService.getPropertyById(id);
    return this.apiResponseFactory.success(property, 'Property request', response);
  }

  @Delete('/:id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiBearerAuth()
  async deleteProperty(
      @Param('id') id: string,
      @Res() response: Response,
  ) {
    const deletedProperty = await this.propertyService.deleteProperty(id);
    return this.apiResponseFactory.success(deletedProperty, 'Property successfully deleted', response);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiBearerAuth()
  async updateProperty(
      @ContextUser() user: User,
      @Body() dto: UpdatePropertyDto,
      @Res() response: Response,
      @Param('id') id: string,
  ): Promise<any> {
    const updatedProperty = await this.propertyService.updateProperty(id, user, dto);
    return this.apiResponseFactory.success(updatedProperty, 'Property successfully updated', response);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiBearerAuth()
  async getAll(
      @ContextUser() user: User,
      @Res() response: Response,
  ): Promise<any> {
    const allProperties = await this.propertyService.getAllProperties(user);
    return this.apiResponseFactory.success(allProperties, 'Properties successfully listed!', response);
  }
}
