import React, {useEffect, useState} from "react";
import "./Searchbar.scss";
import {cn} from "../../../utils";

import SearchIcon from '@material-ui/icons/Search';

const bem = cn("searchbar");

export const Search = ({onChange}: {
	onChange?: React.ChangeEventHandler;
}) => {
	return (
		<div className={bem("search")}>
			<input
				className={bem("searchTerm")}
				type="text"
				onChange={onChange}
				placeholder="Search by ..."
			/>
			<button type="submit" className={bem("searchButton")}>
				<SearchIcon></SearchIcon>
			</button>
		</div>
	);
};


