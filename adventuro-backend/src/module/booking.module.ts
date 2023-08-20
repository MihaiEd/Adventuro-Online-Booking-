import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ApiResponseFactory} from "../security/ApiResponseFactory";
import {BookingController} from "../controller/booking.controller";
import {Booking} from "../model/entity/Booking";
import {Property} from "../model/entity/Property";
import {Price} from "../model/entity/Price";
import {Address} from "../model/entity/Address";
import {User} from "../model/entity/User";
import {BookingService} from "../service/booking.service";
import { PropertyModule } from "./property.module";
import {QueryParamsParser} from "../util/QueryParamsParser";

@Module({
    imports: [PropertyModule, TypeOrmModule.forFeature([Booking, Property, Price, Address, User])],
    exports: [TypeOrmModule],
    controllers: [BookingController],
    providers: [ApiResponseFactory, BookingService, QueryParamsParser],
})
export class BookingModule {}