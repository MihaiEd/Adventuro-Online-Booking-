import React from "react";
import { TableProps } from "./types";

//styles
import './Table.scss';
import {cn} from "../../../utils";
const bem = cn('table');

export default function Table(props: TableProps) {
		const {populateHeader, populateBody} = props;

		return (
			<table className={bem()}>
				<thead>{populateHeader()}</thead>
				<tbody>{populateBody()}</tbody>
			</table>
		)
}
