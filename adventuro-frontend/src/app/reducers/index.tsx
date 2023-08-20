import {combineReducers} from 'redux';
import literalsReducer from "./literalsReducer";
import {connectRouter} from "connected-react-router";
import {toolbarReducer} from "./toolbarReducer";
import {categoriesReducer} from "./categoryReducer";
import { usersReducer } from "./usersReducer";
import { propertiesReducer } from "./propertiesReducer";
import {bookingReducer} from "./bookingReducer";

export default function createRootReducer(history: any) {
	return combineReducers(
		{
			router: connectRouter(history),
			literals: literalsReducer,
			toolbar: toolbarReducer,
			category: categoriesReducer,
			register: usersReducer,
			user: usersReducer,
			property: propertiesReducer,
			booking: bookingReducer,
		},
	);
}
