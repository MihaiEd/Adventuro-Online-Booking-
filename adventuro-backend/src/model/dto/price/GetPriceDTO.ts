import { PriceEnum } from "../../enum/PriceEnum";
import { Price } from "../../entity/Price";

export  class GetPriceDTO {
  id: string;
  value: number;
  currency: PriceEnum;

  constructor(price: Price) {
    this.id = price.id;
    this.value = price.value;
    this.currency = price.currency;
  }
}