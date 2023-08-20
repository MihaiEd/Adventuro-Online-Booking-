import {Booking} from "../../../models";

export interface ConfirmBookingPopupProps {
	readonly createBooking: (booking: Booking) => void;
	readonly editBooking: (booking: Booking) => void;
	readonly open: boolean;
	readonly setOpen: (value: boolean) => void;
	readonly isEditMode: boolean;
	readonly setIsEditMode: (value: boolean) => void;
	readonly setBooking: (booking: Booking) => void;
	booking: Booking;
}
