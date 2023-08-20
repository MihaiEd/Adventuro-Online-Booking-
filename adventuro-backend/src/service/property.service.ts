import {
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/entity/User';
import { Repository } from 'typeorm';
import { Address } from '../model/entity/Address';
import { Price } from '../model/entity/Price';
import { Property } from '../model/entity/Property';
import { GetPropertyDTO } from '../model/dto/property/GetPropertyDTO';
import { Booking } from '../model/entity/Booking';
import { UpdatePropertyDto } from '../model/dto/property/UpdatePropertyDto';
import { plainToClass } from 'class-transformer';
import { RoleEnum } from '../model/enum/RoleEnum';
import { CreatePropertyDto } from '../model/dto/property/CreatePropertyDto';

@Injectable()
export class PropertyService {
    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(Price)
        private readonly priceRepository: Repository<Price>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) {
    }

    async createProperty(dto: CreatePropertyDto, user: User): Promise<GetPropertyDTO> {

        if (user === null) {
            throw new NotFoundException("User not found!")
        }

        if (user.role.name != RoleEnum.OWNER) {
            throw new ConflictException('Access forbidden!')
        }

        const userEntity = await this.userRepository.findOne({
            where: {
                id: user.id
            }
        });

        const propertyEntity: Property = plainToClass(Property, dto);
        propertyEntity.user = userEntity;
        const createdProperty: Property = await this.propertyRepository.save(propertyEntity);

        return new GetPropertyDTO(createdProperty);
    }

    async getPropertyById(id: string): Promise<GetPropertyDTO> {
        const property = await this.propertyRepository.findOne({
            where: {
                id: id,
            },
            relations: ['bookings', 'address', 'price'],
        });

        if (property === null) {
            throw new NotFoundException('Property not found!');
        }

        return new GetPropertyDTO(property);
    }

    async deleteProperty(id: string) {
        const currentProperty = await this.propertyRepository.findOneBy({id: id});

        if (currentProperty === null) {
            throw new NotFoundException('Property not found!');
        }


        const deleteProperty = await this.propertyRepository.delete(id);

        if (!deleteProperty.affected) {
            throw new HttpException('Could not delete Property', HttpStatus.NOT_FOUND);
        }
    }

    async updateProperty(id: string, authenticatedUser: User, dto: UpdatePropertyDto): Promise<GetPropertyDTO> {
        if (authenticatedUser.role.name === RoleEnum.CLIENT) {
            throw new ConflictException("Cannot update properties")
        }

        const property = await this.propertyRepository.findOne({
            where: {
                id: id,
            },
            relations: ['bookings', 'address', 'price'],
        });

        if (property === null) {
            throw new NotFoundException('Property could not be found');
        }

        const updatedPropertyEntity: Property = plainToClass(Property, dto);
        updatedPropertyEntity.id = id;

        return await this.propertyRepository.save(updatedPropertyEntity);
    };

    async getAllProperties(authenticatedUser: User): Promise<Property[]>
    {
        if (authenticatedUser.role.name === RoleEnum.OWNER){
            return await this.propertyRepository.find({
                    where: {
                        user: {
                            id: authenticatedUser.id
                        }
                    },
                relations: ['price', 'address', 'user']
                }
            )
        }
        return await this.propertyRepository.find(
            {
                relations: ['price', 'address', 'user']
            });
    }
}
