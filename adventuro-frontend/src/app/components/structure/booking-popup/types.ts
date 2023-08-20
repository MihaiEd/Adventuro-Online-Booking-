import {Booking} from "../../../models/Booking";

export interface BookingPopupProps {
	readonly open: boolean;
	readonly setOpen: (value: boolean) => void;
	readonly setBooking: (booking: Booking) => void;
	readonly createBooking: (booking: Booking) => void;
	booking: Booking;
	price: number;
}
