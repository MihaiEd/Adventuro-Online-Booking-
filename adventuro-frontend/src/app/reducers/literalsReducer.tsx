import {LOAD_LITERALS} from "../actions/actionTypes";
import {LoadLiteralsAction} from "../actions/actions";

const defaultState = {};

export default (state: {} = defaultState, action: LoadLiteralsAction) => {
	if (action.type === LOAD_LITERALS) {
		return action.payload;
	} else {
		return state;
	}
};

export const loadLiterals = (literals: any) => ({
	type: LOAD_LITERALS,
	payload: literals,
});
