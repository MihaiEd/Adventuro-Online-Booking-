import {Category, ToolbarActions} from "../models";
import { User, UserRegister } from "../models";
import { Property } from "../models/Property";
import {Booking} from "../models/Booking";

export interface LoadLiteralsAction {
	type: string;
	payload: any;
}

export interface ToolbarAction {
	type: string;
	payload: ToolbarActions;
}

export interface CategoriesAction {
	type: string;
	payload: Category | Category[];
}

export interface UserAction {
	type: string;
	payload: User | User[] | string | UserRegister;
}

export interface PropertyAction {
	type: string;
	payload: Property | Property[] | string;
}

export interface BookingAction {
	type: string;
	payload: Booking | Booking[] | string;
}

