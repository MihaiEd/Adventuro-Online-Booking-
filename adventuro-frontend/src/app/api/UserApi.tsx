import * as React from "react";
import {axiosInstance, getLocalStorageElement, setLocalStorageElement} from "./DefaultApi";
import { SET_USERS, SET_USER, SET_TOKEN, SET_RESPONSE, SET_REGISTER } from "../actions/actionTypes";
import {Dispatch} from "redux";
import {UserAction} from "../actions/actions";
import {UserLogin, User, UserRegister} from "../models";
import {ID, ROLE, TOKEN} from "../variables/constants";

export const setUsers = (payload: User[]): UserAction => {
	return {
		type: SET_USERS,
		payload
	}
};

export const setUser = (payload: User): UserAction => {
	return {
		type: SET_USER,
		payload
	}
};

export const setToken = (payload: string) => {
	return {
		type: SET_TOKEN,
		payload
	}
};

export const setResponse = (payload: string) => {
	return {
		type: SET_RESPONSE,
		payload
	}
};
export const setUserError = (payload: string) => {
	return {
		type: SET_USER + '_ERROR',
		payload
	}
};
export const setUserRegister = (payload: UserRegister) => {
	return {
		type: SET_REGISTER,
		payload
	}
};

export function login(user: UserLogin) {
	return (dispatch: Dispatch) => {
		axiosInstance.post('/users/login', user)
			.then((response) => {
				dispatch(setToken(response.data.data.authToken.token));
				setLocalStorageElement(TOKEN, response.data.data.authToken.token);
				setLocalStorageElement(ID, response.data.data.id);
				setLocalStorageElement(ROLE, response.data.data.role.name);
			})
			.catch(() => {
				dispatch(setToken(null));
				dispatch(setUserError("Email or password is incorrect"));
			});
	}
}

export function createUser(user: User) {
	return (dispatch: Dispatch) => {
	axiosInstance.post('/users', {...user, password: user.password}, {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
		.then((response) =>
			dispatch(setResponse(response.data.meta.statusCode.toString())));
	}
}

export function getAllUsers() {
	return (dispatch: Dispatch) => {
		axiosInstance.get('/users', {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
			.then((response) => {
				dispatch(setUsers(response.data.data));
			})
	}
}

export function deleteUser(user: User) {
	return (dispatch: Dispatch) => {
		axiosInstance.delete(`users/${user.id}`, {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
			.then(() => {
				axiosInstance.get('/users')
					.then((response) =>
						dispatch(setUsers(response.data.data)));
			})
	}
}

export function editUser(user: User) {
	return (dispatch: Dispatch) => {
		axiosInstance.put(`users/${user.id}`, {...user, role: undefined, id: undefined, authToken: undefined}, {headers: {Authorization: 'Bearer ' + getLocalStorageElement(TOKEN)}})
			.then(() => {
				axiosInstance.get('/users')
					.then((response) =>
						dispatch(setUsers(response.data.data)));
			})
	}
}

export function register(user: UserRegister, history: any) {
	return (dispatch: Dispatch) => {
		axiosInstance.post('/users/register', user)
			.then((response) => {
				console.log(response);
				history.push('/login')
			})
			.catch((response) => {
				console.log(response)
				dispatch(setUserError('Register failed'))
			});
	}
}

export function logout(history: any) {
	localStorage.removeItem(TOKEN);
	localStorage.removeItem(ID);
	localStorage.removeItem(ROLE);
	history.push('/login');
}

