import {Address} from "../../entity/Address";


export class GetAddressDTO {
  id: string;
  country: string;
  city: string;
  county: string;
  addressLine1: string;
  postalCode: number;

  constructor(address: Address) {
    this.id = address.id;
    this.country = address.country;
    this.city = address.city;
    this.county = address.county;
    this.addressLine1 = address.addressLine1;
    this.postalCode = address.postalCode;
  }
}
