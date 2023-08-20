import { Booking } from "../../entity/Booking";

export class GetBookingDTO {
  id: string;
  startDate: Date;
  endDate: Date;
  isConfirmed: boolean;

  constructor(booking: Booking) {
    this.id = booking.id;
    this.startDate = booking.startDate;
    this.endDate = booking.endDate;
    this.isConfirmed = booking.isConfirmed;
  }
}