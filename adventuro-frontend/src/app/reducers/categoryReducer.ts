import {CategoriesAction} from "../actions/actions";
import {LOAD_CATEGORIES, SET_CATEGORY} from "../actions/actionTypes";
import {Category} from "../models";
import {getLocalStorageCategories} from "../api/DefaultApi";

export interface CategoriesState {
	categories: Category[];
	selectedCategory: Category;
}

const initialState: CategoriesState = {
	categories: getLocalStorageCategories(),
	selectedCategory: null as Category
}

export const setCategories = (payload: Category[]): CategoriesAction => {
	return {
		type: LOAD_CATEGORIES,
		payload
	}
};

export const setSelectedCategory = (payload: Category): CategoriesAction => {
	return {
		type: SET_CATEGORY,
		payload
	}
};

export const categoriesReducer = (state: any = initialState, action: CategoriesAction): CategoriesState => {
	switch (action.type) {
		case SET_CATEGORY:
			return {
				categories: state.categories,
				selectedCategory: action.payload as Category
			};
		case LOAD_CATEGORIES:
			return {
				categories: action.payload as Category[],
				selectedCategory: state.selectedCategory
			};
		default:
			return state;
	}
}
