import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePriceDto {
    @ApiPropertyOptional()
    id?: string;

    @ApiPropertyOptional()
    value?: number;

    @ApiPropertyOptional()
    currency?: string;
}
