import {ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateBookingDTO{
    @ApiPropertyOptional()
    isConfirmed?:boolean;

}