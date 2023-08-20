import {Category} from "../../../models";

export interface CategoryCardProps {
	readonly category: Category;
	readonly selectedCategory: Category;
	readonly selectCategory: (category: Category) => void;
}
