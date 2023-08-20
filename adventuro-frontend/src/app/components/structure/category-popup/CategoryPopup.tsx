import React, {ChangeEvent, useEffect, useState} from "react";
import {CategoryPopupProps} from "./types";
// import Modal from '@material-ui/core/Modal';
// import Card from "../../atoms/Card/Card";

//styles
import './CategoryPopup.scss';
import {cn} from "../../../utils";
import TextField from "@material-ui/core/TextField";
import {Category} from "../../../models";
import Button from "../../atoms/button/Button";
import {DEFAULT} from "../../atoms/button/constants";

const bem = cn('category-popup');

export function CategoryPopup(props: CategoryPopupProps) {

	const {
		literals,
		open,
		setOpen,
		selectedCategory,
		isView,
		setIsView,
		createCategory,
		editCategory,
		categories,
		setSelectedCategory
	} = props;
	const [category, setCategory] = useState({} as Category);
	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		if(open || isView) {
			if (selectedCategory) {
				setIsEdit(true);
				setCategory({name: selectedCategory.name});
			} else {
				setIsEdit(false);
				setCategory({name: ""} as Category);
			}
		}
	}, [open, isView]);

	const onCategoryChange = (event: any) => {
		setCategory({name: event.target.value});
	};

	const viewCategory = <div>{category.name}</div>;
	const editCategoryComponent = <>
		<TextField InputProps={{style: {fontSize: 20}}} InputLabelProps={{style: {fontSize: 20}}} type={'text'}
							 value={category?.name} onChange={onCategoryChange}/>
		{!isEdit ? <Button type={DEFAULT} label={literals['create']} onClick={() => {
				createCategory(category);
				setSelectedCategory(null);
				setOpen(false);
			}}/> :
			<Button type={DEFAULT} label={literals['edit']} onClick={() => {
				editCategory(selectedCategory, category, categories);
				setSelectedCategory(null);
				setOpen(false);
			}}/>}
	</>;

	// return (
	// 	<Modal
	// 		open={open || isView}
	// 		onClose={() => {
	// 			setOpen(false);
	// 			setIsView(false)
	// 		}}
	// 		aria-labelledby="modal-modal-title"
	// 		aria-describedby="modal-modal-description"
	// 	>
	// 		<div className={bem()}>
	// 			<Card>
	// 				<h3>{literals['categories']} {isView ? literals['viewDetails']?.toLowerCase() :
	// 					(isEdit ? literals['edit']?.toLowerCase() : literals['create']?.toLowerCase())}</h3>
	// 				{isView ? viewCategory : editCategoryComponent}
	// 			</Card>
	// 		</div>
	// 	</Modal>
	// )
}
