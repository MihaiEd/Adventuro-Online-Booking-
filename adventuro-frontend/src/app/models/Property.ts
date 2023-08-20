import { User } from "./User";
import { Price } from "./Price";
import { Address } from "./Address";

export interface Property {
	id: string;
	type: string;
	hasBreakfast: boolean;
	hasAirConditioning: boolean;
	hasHeating: boolean;
	description: string;
	image: string;
	user: User;
	name: string;
	price: Price;
	address: Address;
}
