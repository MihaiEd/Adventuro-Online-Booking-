import { Property } from "../models/Property";
import { PropertyAction } from "../actions/actions";
import { SET_PROPERTIES, SET_PROPERTY } from "../actions/actionTypes";

export interface PropertiesState {
	properties: Property[];
	currentProperty: Property;
}

const initialState: PropertiesState = {
	properties: [],
	currentProperty: {} as Property
}

export const propertiesReducer = (state: any = initialState, action: PropertyAction): PropertiesState => {
	switch (action.type) {
		case SET_PROPERTIES:
			return {
				properties: action.payload as Property[],
				currentProperty: state.currentProperty
			};
		case SET_PROPERTY:
			return {
				properties: state.properties,
				currentProperty: action.payload as Property
			};
		default:
			return state;
	}
}


