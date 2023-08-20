import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../model/entity/Booking';
import { GetBookingDTO } from '../model/dto/Booking/GetBookingDTO';
import { UpdateBookingDTO } from '../model/dto/Booking/UpdateBookingDTO';
import { User } from '../model/entity/User';
import { RoleEnum } from '../model/enum/RoleEnum';
import { plainToClass } from 'class-transformer';
import { GetAllBookingsDTO } from '../model/dto/booking/GetAllBookingsDTO';
import {QueryParamsParser} from "../util/QueryParamsParser";
import { CreateBookingDTO } from '../model/dto/Booking/CreateBookingDTO';
import { PropertyService } from './property.service';

@Injectable()
export class BookingService {
    constructor(
        public readonly queryParamsParser: QueryParamsParser,
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        private readonly propertyService:  PropertyService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
  )
  {}


  async createBooking(dto: CreateBookingDTO, user: User): Promise<GetBookingDTO> {
    const createBookingDto = new CreateBookingDTO(
      dto.startDate,
      dto.endDate,
      dto.isConfirmed,
      dto.propertyId,
    );

    const bookingProperty = await this.propertyService.getPropertyById(dto.propertyId);
    const userEntity = await this.userRepository.findOne({
      where: {
        id: user.id
      }
    });
    const isValid = await this.validateBooking(createBookingDto, bookingProperty);
    if (isValid === true) {
      return await this.save(createBookingDto, bookingProperty, userEntity);
    } else {
      throw new ConflictException('Invalid booking dates');
    }
  }

  private async save(dto: CreateBookingDTO, bookingProperty, userEntity): Promise<GetBookingDTO> {
    const bookingEntity: Booking = plainToClass(Booking, dto);
    bookingEntity.property = bookingProperty;
    bookingEntity.user = userEntity;
    const createBooking: Booking = await this.bookingRepository.save(
      bookingEntity,
    );

    return new GetBookingDTO(createBooking);
  }

  async validateBooking(booking: CreateBookingDTO, property): Promise<boolean> {
    if (property.bookings.length == 0) return true;
    else {
      const bookings = property.bookings;

      const bookingPairDates = bookings.map((bookingDates) => {
        return {
          startDate: bookingDates.startDate,
          endDate: bookingDates.endDate,
        };
      });

      bookingPairDates.sort((p1, p2) => {
        if (p1.endDate > p2.endDate) {
          return 1;
        }
        if (p1.endDate < p2.endDate) {
          return -1;
        }
        return 0;
      });

      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      for (let index = 0; index < bookingPairDates.length; index++) {
        if (
          bookingPairDates[index].startDate <= startDate &&
          startDate <= bookingPairDates[index].endDate
        )
          return false;
        if (
          bookingPairDates[index].startDate <= endDate &&
          endDate <= bookingPairDates[index].endDate
        )
          return false;
        if (
          startDate < bookingPairDates[index].startDate &&
          bookingPairDates[index].endDate < endDate
        )
          return false;
      }
      return true;
    }
  }

    async updateBooking(id:string,authenticatedUser: User, dto:UpdateBookingDTO):Promise<GetBookingDTO>{
        if(authenticatedUser.role.name != RoleEnum.ADMIN){
            throw new ConflictException("Client cannot modify bookings")
        }
        const booking= this.bookingRepository.findOneBy({id:id})

        if(booking === null){
            throw new NotFoundException('Booking could not be found');
        }

        const updateBookingEntity: Booking = plainToClass(Booking,dto)

        return await this.bookingRepository.update({
            id:id
        },updateBookingEntity).then((updateResult) => {
            return this.bookingRepository.findOneBy({id:id});
        });
    }

  async deleteBooking(id: string) {
    const currentBooking = await this.bookingRepository.findOneBy({ id: id });

    if (currentBooking === null) {
      throw new NotFoundException('Booking not found!');
    }

    const deleteBooking = await this.bookingRepository.delete(id);

    if (!deleteBooking.affected) {
      throw new HttpException('Could not delete Booking', HttpStatus.NOT_FOUND);
    }
  }

  async getBookingById(id: string): Promise<GetBookingDTO> {
    const booking = await this.bookingRepository.findOne({
      where: {
        id: id,
      },
      relations: ['property', 'property.address', 'property.price'],
    });
    if (booking === null) {
      throw new NotFoundException('Booking not found!');
    }

        return new GetBookingDTO(booking);
    }


    async getAllBookings(params: GetAllBookingsDTO): Promise<Booking[]> {
        const parsedParams = await this.queryParamsParser.filter(params);

        if (params.property != null) {
            parsedParams["property"] = {
                id: params.property
            }
        }
        return await this.bookingRepository.find({
            where: parsedParams
        });
    }
    async getAllUserBookings(authenticatedUser: User): Promise<Booking[]> {
      if(authenticatedUser.role.name === RoleEnum.CLIENT){
        return await this.bookingRepository.find( {
          where: {
            user: {
              id: authenticatedUser.id
            }
          },
          relations: ['property']
        })
      }
      return await this.bookingRepository.find(
        {
          relations: ['property']
        }
      );
    }

    async getBookingsForUser(authenticatedUser: User): Promise<Booking[]> {
        if (authenticatedUser.role.name === RoleEnum.ADMIN) {
            // Dacă utilizatorul are rol de admin, returnează toate bookings-urile
            return this.bookingRepository.find({
                relations: ['property'],
            });
        } else {
            // Dacă utilizatorul are alt rol (presupunând că este owner), returnează doar bookings-urile asociate lui
            const ownerId = authenticatedUser.id;
            return this.bookingRepository.find({
                where: {
                    user: {
                        id: ownerId,
                    },
                },
                relations: ['property'],
            });
        }
    }
}
