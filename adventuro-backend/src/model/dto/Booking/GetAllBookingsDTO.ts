import {ApiPropertyOptional} from "@nestjs/swagger";
import {Transform, Type} from "class-transformer";

export class GetAllBookingsDTO{
    @ApiPropertyOptional()
    readonly property?: string;

    @Transform(({ obj, key }) => obj[key] === 'true')
    @Type(() => Boolean)
    @ApiPropertyOptional()
    readonly isConfirmed?: boolean;

    @Type(() => Date)
    @ApiPropertyOptional()
    readonly startDate?: Date;

    @Type(() => Date)
    @ApiPropertyOptional()
    readonly endDate?: Date;
}
