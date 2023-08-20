import { User } from "../models";
import { UserAction } from "../actions/actions";
import { SET_RESPONSE, SET_REGISTER, SET_TOKEN, SET_USER, SET_USERS } from "../actions/actionTypes";
import {getLocalStorageElement} from "../api/DefaultApi";
import {TOKEN} from "../variables/constants";
import {UserRegister} from "../models";

export interface UserState{
	users: User[];
	currentUser: User;
	registerUser: UserRegister;
	token: string;
	response: string;
	error: string;
}

const initialState: UserState = {
	users: [],
	currentUser: {} as User,
	token: getLocalStorageElement(TOKEN) || null,
	response: null,
	registerUser: {} as UserRegister,
	error: null
}


export const usersReducer = (state: any = initialState, action: UserAction): UserState => {
	switch (action.type) {
		case SET_USERS:
			return {
				users: action.payload as User[],
				currentUser: state.currentUser,
				token: state.token,
				response: state.response,
				registerUser: state.registerUser,
				error: null
			};
		case SET_USER:
			return {
				users: state.users,
				currentUser: action.payload as User,
				token: state.token,
				response: state.response,
				registerUser: state.registerUser,
				error: null
			}
		case SET_TOKEN:
			return {
				users: state.users,
				currentUser: state.currentUser,
				token: action.payload as string,
				registerUser: state.registerUser,
				response: state.response,
				error: null
			};
		case SET_RESPONSE:
			return {
				users: state.users,
				currentUser: state.currentUser,
				token: state.token,
				response: action.payload as string,
				registerUser: state.registerUser,
				error: null
			};
		case SET_REGISTER: {
			return {
				users: state.users,
				currentUser: state.currentUser,
				response: state.response,
				registerUser: action.payload as UserRegister,
				token: state.token,
				error: null
			};
		}
		case SET_USER + '_ERROR': {
			return {
				users: state.users,
				currentUser: state.currentUser,
				registerUser: state.registerUser,
				response: state.response,
				token: state.token,
				error: action.payload as string
			};
		}
		default:
			return state;
	}
}

