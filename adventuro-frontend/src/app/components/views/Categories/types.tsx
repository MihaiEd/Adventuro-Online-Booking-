import {Category, ToolbarActions} from "../../../models";

export interface CategoriesProps {
	readonly literals?: any;
	readonly categories: Category[];
	readonly selectedCategory: Category;
	readonly deleteCategory: (category: Category, categories: Category[]) => void;
	readonly setSelectedCategory: (category: Category) => void;
	readonly setToolbarTitle: (toolbarActions: ToolbarActions) => void;
	readonly setToolbarActions: (toolbarActions: ToolbarActions) => void;
}
