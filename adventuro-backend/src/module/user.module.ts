import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../model/entity/User';
import { Role } from '../model/entity/Role';
import { ApiResponseFactory } from '../security/ApiResponseFactory';
import { UserService } from '../service/user.service';
import { JwtStrategy } from '../security/strategy/JwtStrategy';
import { UserController } from '../controller/user.controller';
import {Property} from "../model/entity/Property";
import {Booking} from "../model/entity/Booking";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role,Property, Booking]),
    ],
    exports: [TypeOrmModule],
    controllers: [UserController],
    providers: [ApiResponseFactory, UserService, JwtStrategy],
})
export class UserModule {
}
