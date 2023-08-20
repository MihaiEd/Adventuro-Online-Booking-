import * as React from "react";
import {CategoriesProps} from "./types";
import { ReactNode, useEffect, useState } from "react";
import CategoriesList from "../../structure/categories-list/CategoriesList";
import {ToolbarActions} from "../../../models";
// import CategoryPopup from "../../structure/category-popup/mapping";
import DateRangePicker from "../../molecules/datepicker/DateRangePicker";
import Link from "../../atoms/link/Link";
import Table from "../../molecules/table/Table";
// @material-ui/icons
// core components

export default function CategoriesView(props: CategoriesProps) {
	const {literals, setToolbarActions, setToolbarTitle, categories, selectedCategory, deleteCategory, setSelectedCategory} = props;

	const [openModal, setIsOpen] = useState(false);
	const [isViewMode, setIsViewMode] = useState(false);

	let toolbarActions: ToolbarActions = {
		create: () => {setSelectedCategory(null); setIsOpen(true);}
	}

	useEffect(() => {
		setToolbarTitle({title: literals['categories']});
		setToolbarActions(toolbarActions);
	},[]);

	useEffect(() => {
		if(selectedCategory) {
			toolbarActions.edit = () => {setIsOpen(true)};
			toolbarActions.viewDetails = () => setIsViewMode(true);
			toolbarActions.delete = () => {deleteCategory(selectedCategory, categories); setSelectedCategory(null);}
		} else {
			toolbarActions.edit = null;
			toolbarActions.viewDetails = null;
			toolbarActions.delete = null;
		}
		setToolbarActions(toolbarActions);
	},[selectedCategory]);

	return (
		<div>
	{/*// 		<CategoryPopup isView={isViewMode} setIsView={setIsViewMode} open={openModal} setOpen={setIsOpen} />*/}
			<CategoriesList categories={categories}/>
	 		{/*<div></div>*/}
	 		{/*<DateRangePicker value={new Date()}></DateRangePicker>*/}
			{/*<Link href={'https://www.google.com'} value={'Google'} target='_blank'/>*/}
		</div>
	);
}
