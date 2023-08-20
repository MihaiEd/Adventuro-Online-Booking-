import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDTO {
  @IsNotEmpty()
  @ApiProperty()
  startDate?: Date;

  @IsNotEmpty()
  @ApiProperty()
  endDate?: Date;

  @IsNotEmpty()
  @ApiProperty({default: false})
  isConfirmed: boolean;

  @IsNotEmpty()
  @ApiProperty()
  propertyId: string;

  constructor(startDate: Date, endDate: Date, isConfirmed: boolean, propertyId: string) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.isConfirmed = isConfirmed;
    this.propertyId = propertyId;
  }

}