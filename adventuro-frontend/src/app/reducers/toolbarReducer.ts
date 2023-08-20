import {ToolbarActions} from "../models/ToolbarActions";
import {ToolbarAction} from "../actions/actions";
import {SET_TOOLBAR_ACTIONS, SET_TOOLBAR_TITLE} from "../actions/actionTypes";

export interface ToolbarState {
	toolbarActions: ToolbarActions;
}

const initialState: ToolbarState = {
	toolbarActions: {} as ToolbarActions
}

export const setToolbarTitle = (payload: ToolbarActions): ToolbarAction => {
	return {
		type: SET_TOOLBAR_TITLE,
		payload
	}
};

export const setToolbarActions = (payload: ToolbarActions): ToolbarAction => {
	return {
		type: SET_TOOLBAR_ACTIONS,
		payload
	}
};

export const toolbarReducer = (state: any = initialState, action: ToolbarAction) => {
	switch (action.type) {
		case SET_TOOLBAR_ACTIONS:
			return {
				toolbarActions: {title: state.toolbarActions.title, ...action.payload}
			};
		case SET_TOOLBAR_TITLE:
			return {
				toolbarActions: {title: action.payload.title, ...state.toolbarActions}
			};
		default:
			return state;
	}
}
