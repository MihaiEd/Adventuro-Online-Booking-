import React from "react";
import {ListProps} from "./types";
import {Orientation} from "../../molecules/list/constants";

//styles
import "./List.scss";
import {cn} from "../../../utils";

const bem = cn('list');

export default function List(props: ListProps) {

	const {populateList, orientation} = props;

	const orientationVertical = orientation === 'vertical';

	return (
		<ul className={bem("", {vertical: orientationVertical})}>
			{populateList()}
		</ul>
	)
}
