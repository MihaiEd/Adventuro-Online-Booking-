import {cn} from "../../../utils";
import {BookingsPageProps} from "./types";
import {ReactNode, useEffect, useState} from "react";
import * as React from "react";
import Checkbox from "../../atoms/checkbox/Checkbox";
import Button from "../../atoms/button/Button";
import IconMapper from "../../atoms/IconMapper/IconMapper";
import {Property} from "../../../models/Property";
import Table from "../../molecules/table/Table";
import ConfirmBookingPopup from "../../structure/confirm-bookings/mapping";
import  "./Bookings.scss"

const bem = cn("bookings");

export default function BookingsView(props: BookingsPageProps) {
	const {bookings, getAllBookings, deleteBooking, setBooking} = props;

	const [openModal, setIsOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);

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
				<div className={bem("actions")}><Button type={"contained"} onClick={() => {
					setIsOpen(true);
					setIsEditMode(true);
					setBooking(value);
				}}>{IconMapper["edit"]}</Button>
					<Button type={"contained"}
									onClick={() => deleteBooking(value)}>{IconMapper["delete"]}</Button></div>
			</td>
		</tr>));
	};

	return (
		<div>
			<ConfirmBookingPopup open={openModal} setOpen={setIsOpen} isEditMode={isEditMode} setIsEditMode={setIsEditMode} ></ConfirmBookingPopup>
			<Table populateHeader={populateHeader} populateBody={populateBody} />
		</div>
	);
}
