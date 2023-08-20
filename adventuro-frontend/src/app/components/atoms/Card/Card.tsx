import * as React from "react";
import {CardProps} from "./types";

//styles
import "./Card.scss";
import {cn} from "../../../utils";

const bem = cn('card');

export default function Card(props: CardProps) {

	const {children} = props;

	return (
		<div className={bem('')}>
			{children}
		</div>
	)
}
