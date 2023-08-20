import {deleteBooking, getAllBookings, setBooking} from "../../../api/BookingApi";
import {connect} from "react-redux";
import MyBookingsView from "./MyBookings";

export const mapStateToProps = (state: any) => ({
	bookings: state.booking.bookings
})

export const mapDispatchToProps = {
	getAllBookings: getAllBookings,
	deleteBooking: deleteBooking,
	setBooking: setBooking,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingsView)
