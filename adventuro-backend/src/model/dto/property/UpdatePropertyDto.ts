import {ApiPropertyOptional} from "@nestjs/swagger";
import {PropertyTypeEnum} from "../../enum/PropertyTypeEnum";
import {UpdateAddressDto} from "../address/UpdateAddressDto";
import {UpdatePriceDto} from "../price/UpdatePriceDto";

export class UpdatePropertyDto {
    @ApiPropertyOptional()
    type?: PropertyTypeEnum;

    @ApiPropertyOptional()
    name?: string;

    @ApiPropertyOptional()
    hasBreakfast?: boolean;

    @ApiPropertyOptional()
    hasAirConditioning?: boolean;

    @ApiPropertyOptional()
    hasHeating?: boolean;

    @ApiPropertyOptional()
    description?: string;

    @ApiPropertyOptional()
    image?: string;

    @ApiPropertyOptional()
    address?: UpdateAddressDto;

    @ApiPropertyOptional()
    price?: UpdatePriceDto;
}