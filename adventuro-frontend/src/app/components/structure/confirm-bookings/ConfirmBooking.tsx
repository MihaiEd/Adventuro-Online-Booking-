import {cn} from "../../../utils";
import {ConfirmBookingPopupProps} from "./types";
import React, {useEffect} from "react";
import Modal from "@material-ui/core/Modal";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/button/Button";
import {TextField} from "@material-ui/core";
import Checkbox from "../../atoms/checkbox/Checkbox";
import "./ConfirmBooking.scss";

const bem = cn("confirm-booking-popup");

export function ConfirmBookingPopup(props: ConfirmBookingPopupProps) {
	const {open, setOpen, editBooking, booking, isEditMode, setIsEditMode, setBooking} = props;

	useEffect(() => {
		if(open && booking) {
			setIsEditMode(true)
		} else {
			setIsEditMode(false)
		}
	}, []);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Modal open={open} onClose={(reason) => {
			if (reason !== "backDropClick") {
				handleClose();
			}
		}}>
			<div className={bem()}>
				<Card>
					<div className={bem("close")}>
						<Button type={"default"} label={"X"} onClick={() => setOpen(false)} />
					</div>
					<div className={bem("form")}>
						<Checkbox value={booking.isConfirmed} text={"Is Confirmed"} disabled={false}
											setValue={value => setBooking({ ...booking, isConfirmed: value })} />
					</div>
					<Button type={"contained"} label={ "Edit" }
									onClick={() =>  editBooking(booking) } />
				</Card>
			</div>
		</Modal>
	);
}
