import {Category} from "./Category";

export interface Location {
	name: string;
	address: string;
	coordinates: Coordinates;
	category: Category;
}

export interface Coordinates {
	x: number;
	y: number
}
