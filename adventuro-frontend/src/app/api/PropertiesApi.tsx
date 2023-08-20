import { Property } from "../models/Property";
import { PropertyAction } from "../actions/actions";
import { SET_PROPERTIES, SET_PROPERTY } from "../actions/actionTypes";
import { Dispatch } from "redux";
import { axiosInstance, getLocalStorageElement } from "./DefaultApi";
import { TOKEN } from "../variables/constants";

export const setProperties = (payload: Property[]): PropertyAction => {
	return {
		type: SET_PROPERTIES,
		payload
	}
}

export const setProperty = (payload: Property): PropertyAction => {
	return {
		type: SET_PROPERTY,
		payload
	}
}

export function getAllProperties() {
	return (dispatch: Dispatch) => {
		axiosInstance.get('/properties', {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
			.then((response) => {
				dispatch(setProperties(response.data.data));
			})
	}
}

export function createProperty(property: Property, history: any) {
	axiosInstance.post('/properties', property, {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
		.then((response) => {
			console.log(response);
			history.push('/properties')
		})
}

export function editProperty(property: Property) {
	return (dispatch: Dispatch) => {
		axiosInstance.put(`properties/${property.id}`, property, {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
			.then(() => {
				axiosInstance.get('/properties', {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
					.then((response) =>
						dispatch(setProperties(response.data.data)));
			})
	}
}

export function deleteProperty(property: Property) {
	return (dispatch: Dispatch) => {
		axiosInstance.delete(`properties/${property.id}`, {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
			.then(() => {
				axiosInstance.get('/properties', {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
					.then((response) =>
						dispatch(setProperties(response.data.data)));
			})
	}
}
