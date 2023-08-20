import { Property } from "../models/Property";
import { PropertyAction } from "../actions/actions";
import { SET_PROPERTY } from "../actions/actionTypes";
import { Dispatch } from "redux";
import { axiosInstance, getLocalStorageElement } from "./DefaultApi";
import { TOKEN } from "../variables/constants";

export const setProperty = (payload: Property): PropertyAction => {
	return {
		type: SET_PROPERTY,
		payload
	};
};

export function getProperty(id: string) {
	return (dispatch: Dispatch) => {
		axiosInstance.get(`/properties/${id}`, { headers: { Authorization: "Bearer " + getLocalStorageElement(TOKEN) } })
			.then((response) => {
				dispatch(setProperty(response.data.data));
			});
	};
}
