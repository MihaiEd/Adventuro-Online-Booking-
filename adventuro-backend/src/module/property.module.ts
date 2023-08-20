import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../model/entity/Property';
import { Address } from '../model/entity/Address';
import { Price } from '../model/entity/Price';
import { PropertyController } from '../controller/property.controller';
import { ApiResponseFactory } from '../security/ApiResponseFactory';
import { PropertyService } from '../service/property.service';
import { User } from '../model/entity/User';
import {Booking} from "../model/entity/Booking";

@Module({
  imports: [TypeOrmModule.forFeature([Property, Booking, Address, Price, User])],
  exports: [TypeOrmModule, PropertyService],
  controllers: [PropertyController],
  providers: [ApiResponseFactory, PropertyService],
})
export class PropertyModule {}
