import React, {useEffect} from "react";
import {CategoryCardProps} from "./types";
import Card from "../../atoms/Card/Card";
import {Category} from "../../../models";

//styles
import "./CategoryCard.scss";
import {cn} from "../../../utils";
const bem = cn('category-card');

export default function CategoryCard(props: CategoryCardProps) {

	const {category, selectCategory, selectedCategory} = props;

	const onCategoryClick = () => {
		if(category === selectedCategory) {
			selectCategory(null as Category);
		} else {
			selectCategory(category);
		}
	}

	return (
		<div className={bem({selected: category === selectedCategory})} onClick={() => onCategoryClick()}>
			<Card>{category?.name}</Card>
		</div>
	);
}
