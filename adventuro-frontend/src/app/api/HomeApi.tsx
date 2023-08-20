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
