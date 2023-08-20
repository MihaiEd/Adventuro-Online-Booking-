import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddressDto {
    @IsNotEmpty()
    @ApiProperty()
    country: string;

    @IsNotEmpty()
    @ApiProperty()
    city: string;

    @IsNotEmpty()
    @ApiProperty()
    county: string;

    @IsNotEmpty()
    @ApiProperty()
    addressLine1: string;

    @IsNotEmpty()
    @ApiProperty()
    postalCode: string;
}