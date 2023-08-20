import {
    Body,
    Controller,
    Delete,
    Get,
    Param, Post,
    Put,
    Query,
    Res,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { ApiResponseFactory } from '../security/ApiResponseFactory';
import {AuthGuard} from "@nestjs/passport";
import {RoleGuard} from "../security/guard/RoleGuard";
import {ContextUser} from "../security/decorator/ContextUser";
import {User} from "../model/entity/User";
import {Response} from "express";
import {UpdateBookingDTO} from "../model/dto/Booking/UpdateBookingDTO";
import {Roles} from "../security/decorator/RoleDecorator";
import {RoleEnum} from "../model/enum/RoleEnum";
import {BookingService} from "../service/booking.service";
import { CreateBookingDTO } from "../model/dto/Booking/CreateBookingDTO";
import {GetAllBookingsDTO} from "../model/dto/booking/GetAllBookingsDTO";

@Controller('bookings')
@ApiTags('bookings')
export class BookingController {
    constructor(
        private readonly apiResponseFactory: ApiResponseFactory,
        private readonly bookingService: BookingService,
    ) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async create(
      @ContextUser() user: User,
      @Body() dto: CreateBookingDTO,
      @Res() response: Response,
    ): Promise<any> {
        const createdBooking = await this.bookingService.createBooking(dto, user);
        return this.apiResponseFactory.success(createdBooking, 'Boooking successfully created ', response);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    async update(
        @ContextUser() user: User,
        @Body() dto: UpdateBookingDTO,
        @Res() response: Response,
        @Param('id') id: string,
    ): Promise<any> {
        const updatedBooking = await this.bookingService.updateBooking(id,user,dto)
        return this.apiResponseFactory.success(updatedBooking, 'booking successfully updated', response);
    }


    @Delete('/:id')
    @Roles(RoleEnum.ADMIN, RoleEnum.CLIENT)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    async deleteBooking(
        @Param('id') id: string,
        @Res() response: Response,
    ) {
        const deletedBooking = await this.bookingService.deleteBooking(id);
        return this.apiResponseFactory.success(deletedBooking, 'Booking successfully deleted', response);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getBookingById(
      @Res() response: Response,
      @Param('id') id: string,
    ): Promise <any> {
        const booking = await  this.bookingService.getBookingById(id);
        return this.apiResponseFactory.success(booking, 'Booking request', response);
    }

    // @Get()
    // @UseGuards(AuthGuard('jwt'))
    // @ApiBearerAuth()
    // @UsePipes(new ValidationPipe({transform: true}))
    // async getAllBookings(
    //     @Res() response: Response,
    //     @Query() params: GetAllBookingsDTO
    // ){
    //     const allBookings = await this.bookingService.getAllBookings(params);
    //     if (!allBookings)
    //         return this.apiResponseFactory.error('Booking not found', {}, response);
    //
    //     return this.apiResponseFactory.success(allBookings, 'Bookings successfully listed!', response);
    // }

    @Get()
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    async getAll(
      @ContextUser() user: User,
      @Res() response: Response,
    ): Promise<any> {
        const allBookings = await this.bookingService.getAllUserBookings(user);
        return this.apiResponseFactory.success(allBookings, 'Bookings successfully listed!', response);
    }

    @Get('/ownerbookings/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getOwnerBookings(
        @ContextUser() user: User,
        @Res() response: Response,
    ): Promise<any> {
        const ownerId = user.id;
        const ownerBookings = await this.bookingService.getBookingsForUser(user);
        return this.apiResponseFactory.success(
            ownerBookings,
            'Bookings successfully listed!',
            response,
        );
    }
}
