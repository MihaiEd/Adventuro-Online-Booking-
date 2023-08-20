import "./SearchProperty.scss";
import React, {useEffect, useState} from "react";
import {cn} from "../../../utils";
import {Search} from "../../molecules/searchbar/Searchbar";
import {SearchPropertyProps} from "./types";




const bem = cn("searchproperty");

export function SearchProperty(props: SearchPropertyProps) {

	const {properties, setProperties} = props;

	const [searchInput, setSearchInput] = useState("");


	useEffect(() => {
		const timeoutID = setTimeout(() => {
			if (searchInput !== '') {
				let currentProps = properties.filter((property) => property.name.toLowerCase().includes(searchInput));
				setProperties(currentProps);
			} else {
				setProperties(properties);
			}
		}, 1000);

		return () => clearTimeout(timeoutID);
	}, [searchInput, properties, setProperties]);

	useEffect(() => {
		setProperties(properties);
	}, [properties, setProperties]);

	const handleChange = (event: any) => {
		event.preventDefault();
		setSearchInput(event.target.value);
	};

	return (
		<div className={bem('wrapper')}>
			<Search onChange={handleChange}></Search>

		</div>
	);
}





