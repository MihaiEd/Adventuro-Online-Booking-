import {User} from "./User";
import {Property} from "./Property";

export interface Booking {
	id: string;
	startDate: Date;
	endDate: Date;
	isConfirmed: boolean;
	userId: string;
	propertyId: string;
}
