import React from "react";
import {CategoriesListProps} from "./types";
import {Category} from "../../../models";
import CategoryCard from "../category-card/mapping";

//styles
import './Categories.scss';
import {cn} from "../../../utils";
const bem = cn('categories-list');

export default function CategoriesList(props: CategoriesListProps) {

	const {categories} = props;

	return (
		<div className={bem()}>
			{categories?.map((category: Category, index: number) => (
				<CategoryCard key={`${category.name}-${index}`} category={category}/>
			))
			}
		</div>
	);
}
