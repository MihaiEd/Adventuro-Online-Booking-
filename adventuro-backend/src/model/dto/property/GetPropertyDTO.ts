import { PropertyTypeEnum } from '../../enum/PropertyTypeEnum';
import { Property } from '../../entity/Property';
import { GetPriceDTO } from '../price/GetPriceDTO';
import { GetAddressDTO } from '../address/GetAddressDTO';
import { GetBookingDTO } from '../Booking/GetBookingDTO';

export class GetPropertyDTO {
  id: string;
  name: string;
  type: PropertyTypeEnum;
  hasBreakfast: boolean;
  hasAirConditioning: boolean;
  hasHeating: boolean;
  description: string;
  image: string;
  address: GetAddressDTO;
  price: GetPriceDTO;
  bookings: GetBookingDTO[];

  constructor(property: Property) {
    this.id = property.id;
    this.name = property.name;
    this.type = property.type;
    this.hasBreakfast = property.hasBreakfast;
    this.hasAirConditioning = property.hasAirConditioning;
    this.hasHeating = property.hasHeating;
    this.description = property.description;
    this.image = property.image;
    this.address = new GetAddressDTO(property.address);
    this.price = new GetPriceDTO(property.price);

    if (property.bookings != null) {
      this.bookings = property.bookings.map((it) => {
        return new GetBookingDTO(it)
      });
    }
  }

}
