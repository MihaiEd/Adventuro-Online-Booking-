import { Booking } from "../models/Booking";
import {BookingAction} from "../actions/actions";
import {SET_BOOKING, SET_BOOKINGS} from "../actions/actionTypes";

export interface BookingState {
	bookings: Booking[];
	currentBooking: Booking;
}

const initialState: BookingState = {
	bookings: [],
	currentBooking: {} as Booking
}

export const bookingReducer = (state: any = initialState, action: BookingAction): BookingState => {
	switch (action.type) {
		case SET_BOOKINGS:
			return {
				bookings: action.payload as Booking[],
				currentBooking: state.currentBooking
			};
		case SET_BOOKING:
			return{
				bookings: state.bookings,
				currentBooking: action.payload as Booking
			};
		default:
			return state;
	}
}
