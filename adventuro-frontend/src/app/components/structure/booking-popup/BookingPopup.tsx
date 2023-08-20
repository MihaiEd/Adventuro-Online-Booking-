import React, { useState} from "react";
import {BookingPopupProps} from "./types";

//styles
import "./BookingPopup.scss"
import {cn} from "../../../utils";
import Modal from "@material-ui/core/Modal";
import Card from "../../atoms/Card/Card";
import DateRangePicker from "../../molecules/datepicker/DateRangePicker";
import {Button} from "@mui/material";
import {getLocalStorageElement} from "../../../api/DefaultApi";
import {ID} from "../../../variables/constants";
// @ts-ignore
import {useParams} from "react-router-dom";

const bem = cn('booking-popup');

export function BookingPopup(props: BookingPopupProps) {

	const {open, setOpen, setBooking, booking, createBooking, price} = props;

	const {id} = useParams();
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const handleCreateBooking = () => {
		try {
			createBooking({
				id: booking.id,
				startDate: startDate,
				endDate: endDate,
				userId: getLocalStorageElement(ID),
				propertyId: id.toString(),
				isConfirmed: false
			});
		} catch (error) {
			console.log("Error:", error);
		}
	};


	const handleClose = () => {
		setOpen(false);
	};


	return (
		<Modal open={open} onClose={(reason) => {
			if (reason !== 'backDropClick') {
				handleClose();
			}
		}}>
			<div className={bem()}>
				<Card>
					<div className={bem('wrapper')}>
						<div className={bem('close')}>
							<Button onClick={() => setOpen(false)}>X</Button>
						</div>
						<div className={bem('price')}>Final price {price * (new Date(endDate - startDate).getDate() - 1)}</div>
						<DateRangePicker label={"Start date"} date={startDate} setDate={setStartDate}></DateRangePicker>
						<DateRangePicker label={"End date"} date={endDate} setDate={setEndDate}></DateRangePicker>
						<div className={bem('close')}></div>
						<Button type={"button"} variant={"outlined"} size={"large"} color={"primary"} onClick={handleCreateBooking}>
							Save Booking</Button>
					</div>
				</Card>
			</div>
		</Modal>
	)
}
