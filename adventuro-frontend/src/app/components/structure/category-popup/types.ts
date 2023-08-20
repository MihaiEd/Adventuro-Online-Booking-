import {Category} from "../../../models";

export interface CategoryPopupProps {
	readonly literals?: any;
	readonly selectedCategory: Category;
	readonly categories: Category[];
	readonly open: boolean;
	readonly isView: boolean;
	readonly setOpen: (value: boolean) => void;
	readonly setIsView: (value: boolean) => void;
	readonly createCategory: (category: Category) => void;
	readonly setSelectedCategory: (category: Category) => void;
	readonly editCategory: (category: Category, newCategory: Category, categories: Category[]) => void;
}
