import * as React from "react";
import {ButtonProps} from "./types";

//styles
import "./Button.scss";
import {cn} from "../../../utils";

const bem = cn('button');

export default function Button(props: ButtonProps) {

	const {label, onClick, type, children} = props;


	return (
		<button onClick={onClick} className={bem('', {contained:type==="contained",outlined:type==="outlined"})}>
			{label || children}
		</button>

	)
}
