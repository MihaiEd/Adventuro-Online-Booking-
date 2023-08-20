import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PriceDto {
    @IsNotEmpty()
    @ApiProperty()
    value: number;

    @IsNotEmpty()
    @ApiProperty()
    currency: string;
}