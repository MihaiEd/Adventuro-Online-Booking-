import {ApiPropertyOptional} from "@nestjs/swagger";
import { IsEmail} from 'class-validator';

export class UpdateUserDto{
    @IsEmail()
    @ApiPropertyOptional()
    email?: string;

    @ApiPropertyOptional()
    firstName?: string;

    @ApiPropertyOptional()
    lastName?: string;
}