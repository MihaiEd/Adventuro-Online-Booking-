import {Category} from "../models";
import {getLocalStorageCategories, setLocalStorageCategories} from "./DefaultApi";
import {setCategories} from "../reducers/categoryReducer";
import { Dispatch } from "redux";

export function createCategory(category: Category) {
	return async (dispatch: Dispatch) => {
		let categories = getLocalStorageCategories() || [];
		categories.push(category);
		setLocalStorageCategories(categories);
		dispatch(setCategories(categories));
	}
}
export function editCategory(oldCategory: Category, newCategory: Category, categories: Category[]) {
	return async (dispatch: Dispatch) => {
		const index = categories.indexOf(oldCategory);
		if(index >= 0) {
			let newCategories = getLocalStorageCategories();
			newCategories[index].name = newCategory.name;
			setLocalStorageCategories(newCategories);
			dispatch(setCategories(newCategories));
		}
	}
}
export function deleteCategory(category: Category, categories: Category[]) {
	return async (dispatch: Dispatch) => {
		const index = categories.indexOf(category);
		if(index >= 0) {
			let newCategories = getLocalStorageCategories() || [];
			newCategories.splice(index, 1);
			setLocalStorageCategories(newCategories);
			dispatch(setCategories(newCategories));
		}
	}

}
