import {Booking} from "../models/Booking";
import {BookingAction} from "../actions/actions";
import {SET_BOOKING, SET_BOOKINGS} from "../actions/actionTypes";
import {Dispatch} from "redux";
import {axiosInstance, getLocalStorageElement} from "./DefaultApi";
import {TOKEN} from "../variables/constants";
import {Property} from "../models/Property";
import {setProperties} from "./PropertiesApi";
import {User} from "../models";

export const setBookings = (payload: Booking[]): BookingAction => {
	return {
		type: SET_BOOKINGS,
		payload
	}
}

export const setBooking = (payload: Booking): BookingAction => {
	return {
		type: SET_BOOKING,
		payload
	}
}

export function getAllBookings() {

	return (dispatch: Dispatch) => {
		axiosInstance.get('/bookings/ownerbookings/:id', {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
			.then((response) => {
				dispatch(setBookings(response.data.data));
			})
	}
}

export function createBooking(booking: Booking) {
	return (dispatch: Dispatch) => {
		axiosInstance.post('/bookings', booking, {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
			.then((response) => {
				console.log(response);
			})
	}
}

export function deleteBooking(booking: Booking) {
		return (dispatch: Dispatch) => {
			axiosInstance.delete(`bookings/${booking.id}`, {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
				.then(() => {
					axiosInstance.get('/bookings', {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
						.then((response) =>
							dispatch(setBookings(response.data.data)));
				})
		}
}

export function editBooking(booking: Booking) {
	return (dispatch: Dispatch) => {
		axiosInstance.put(`bookings/${booking.id}`, booking, {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
			.then(() => {
				axiosInstance.get('/bookings', {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
					.then((response) =>
						dispatch(setProperties(response.data.data)));
			})
	}
}

	// export function getOwnerBookings() {
	// 	return (dispatch: Dispatch) => {
	// 		axiosInstance.get('/bookings/ownerbookings/:id',{headers: { Authorization: "Bearer " + getLocalStorageElement(TOKEN)}})
	// 			.then((response) => {
	// 				dispatch(setBookings(response.data.data));
	// 			});
	// 	};
//}
