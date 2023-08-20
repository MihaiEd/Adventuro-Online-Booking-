import {cn} from "../../../utils";
import {BookingsPageProps} from "./types";
import {ReactNode, useEffect, useState} from "react";
import ResponsiveGrid from "../../molecules/grid/Grid";
import {Grid} from "@material-ui/core";
import * as React from "react";
import Checkbox from "../../atoms/checkbox/Checkbox";
import Button from "../../atoms/button/Button";
import IconMapper from "../../atoms/IconMapper/IconMapper";
import {Property} from "../../../models/Property";
import Table from "../../molecules/table/Table";
import "./MyBookings.scss"


const bem = cn("my-bookings");

export default function MyBookingsView(props: BookingsPageProps) {
	const {bookings, getAllBookings, deleteBooking} = props;

	const populateHeader = () => {
		return ["Property Name","Start date", "End date", "Is Confirmed","Actions"]?.map((value =>
			<th>{value}</th>));
	};

	useEffect(() => {
		getAllBookings();
	}, []);

	const populateBody = (): ReactNode => {
		return bookings?.map((value => <tr>
			<td>{value.property.name}</td>
			<td>{value.startDate}</td>
			<td>{value.endDate}</td>
			<td><Checkbox value={value.isConfirmed} disabled={true} /></td>
			<td>
				<div className={bem("actions")}>
					<Button type={"contained"}
									onClick={() => deleteBooking(value)}>{IconMapper["delete"]}</Button></div>
			</td>
		</tr>));
	};


	return (
		<div>
			<div className={bem("container")}>
			</div>
			<Table populateHeader={populateHeader} populateBody={populateBody} />
		</div>
	);
}
