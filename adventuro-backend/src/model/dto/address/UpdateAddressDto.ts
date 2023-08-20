import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAddressDto {
    @ApiPropertyOptional()
    id?: string;

    @ApiPropertyOptional()
    country?: string;

    @ApiPropertyOptional()
    city?: string;

    @ApiPropertyOptional()
    county?: string;

    @ApiPropertyOptional()
    addressLine1?: string;

    @ApiPropertyOptional()
    postalCode?: string;
}
