import { ApiProperty } from '@nestjs/swagger';
import { PropertyTypeEnum } from '../../enum/PropertyTypeEnum';
import { IsNotEmpty } from 'class-validator';
import { AddressDto } from '../address/AddressDto';
import { PriceDto } from '../price/PriceDto';

export class CreatePropertyDto {
    @IsNotEmpty()
    @ApiProperty()
    type: PropertyTypeEnum;

    @IsNotEmpty()
    @ApiProperty()
    name: string;


    @ApiProperty({default: false})
    hasBreakfast?: boolean;


    @ApiProperty({default: false})
    hasAirConditioning?: boolean;


    @ApiProperty({default: false})
    hasHeating?: boolean;

    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @ApiProperty()
    image: string;

    @IsNotEmpty()
    @ApiProperty()
    address: AddressDto;

    @IsNotEmpty()
    @ApiProperty()
    price: PriceDto;
}
