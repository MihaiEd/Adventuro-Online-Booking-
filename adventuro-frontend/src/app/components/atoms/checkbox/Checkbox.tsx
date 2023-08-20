import { CheckboxProps } from "./types";
import React from "react";
import { Checkbox as DefaultCheckbox } from "@material-ui/core";
import { cn } from "../../../utils";
import './Checkbox.scss'

const bem = cn('checkbox');

export default function Checkbox(props: CheckboxProps) {
	const {setValue, value, text, disabled} = props;

	return (
		<div className={bem()}>
			<DefaultCheckbox onChange={() => setValue(!value)} checked={value} disabled={disabled}/>
			<div className={bem('text')}>{text}</div>
		</div>
	)
}
