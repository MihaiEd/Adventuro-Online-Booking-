import {Booking} from "../../../models/Booking";

export interface BookingsPageProps {
	bookings: Booking[];
	getAllBookings: () => void;
	deleteBooking: (booking: Booking) => void;
	setBooking: (booking: Booking) => void;
}
