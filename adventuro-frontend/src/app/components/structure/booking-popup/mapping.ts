import {createBooking, setBooking} from "../../../api/BookingApi";
import {connect} from "react-redux";
import {BookingPopup} from "./BookingPopup";

export const mapStateToProps = (state:any) => ({
	booking: state.booking.currentBooking
})

export const mapDispatchToProps = {
	createBooking: createBooking,
	setBooking: setBooking
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingPopup);
