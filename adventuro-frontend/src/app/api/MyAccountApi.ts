import {UserAction} from "../actions/actions";
import {SET_USER} from "../actions/actionTypes";
import {Dispatch} from "redux";
import {axiosInstance, getLocalStorageElement} from "./DefaultApi";
import {User} from "../models/User";
import {ID, TOKEN} from "../variables/constants";
import {login} from "./UserApi";

export const setUser = (payload: User): UserAction => {
	return {
		type: SET_USER,
		payload
	}
};

export function getUser(id:string) {
	return(dispatch:Dispatch) => {
	axiosInstance.get(`users/${id}`, {headers:{Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
		.then((response)=>{
			dispatch(setUser(response.data.data))
		})
	}
}

export function editUser(user: User) {
	return(dispatch:Dispatch) => {
		axiosInstance.put(`users/${user.id}`,user, {headers:{Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
			.then((response)=>{
				getUser(getLocalStorageElement(ID))

			})
	}


}
