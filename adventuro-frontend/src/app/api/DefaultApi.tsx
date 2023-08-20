import {CATEGORIES} from "../variables/constants";
import {Category} from "../models";
import axios from "axios";

export function setLocalStorageElement(key: string, value: string) {
	return localStorage.setItem(key, value);
}

export function getLocalStorageElement(key: string) {
	return localStorage.getItem(key);
}

export function setLocalStorageCategories(value: Category[]) {
	return localStorage.setItem(CATEGORIES, JSON.stringify(value));
}

export function getLocalStorageCategories() {
	return JSON.parse(localStorage.getItem(CATEGORIES));
}

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api',
	headers: {
		'Access-Control-Allow-Origin': '*',
		"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
	}
});

