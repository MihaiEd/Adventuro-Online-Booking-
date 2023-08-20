import {connect} from "react-redux";
import {createBooking, editBooking, setBooking} from "../../../api/BookingApi";
import {ConfirmBookingPopup} from "./ConfirmBooking";


export const mapStateToProps = (state: any) => ({
	booking: state.booking.currentBooking
})

export const mapDispatchToProps = {
	createBooking: createBooking,
	editBooking: editBooking,
	setBooking: setBooking,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmBookingPopup);
