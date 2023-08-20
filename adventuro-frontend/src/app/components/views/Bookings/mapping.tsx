import {deleteBooking, editBooking, getAllBookings, setBooking} from "../../../api/BookingApi";
import {connect} from "react-redux";
import BookingsView from "./Bookings";

export const mapStateToProps = (state: any) => ({
	bookings: state.booking.bookings
})

export const mapDispatchToProps = {
	getAllBookings: getAllBookings,
	deleteBooking: deleteBooking,
	setBooking: setBooking,
	editBooking: editBooking,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingsView)
