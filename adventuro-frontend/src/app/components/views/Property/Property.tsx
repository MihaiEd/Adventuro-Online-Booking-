import { PropertyViewProps } from "./types";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { cn } from "../../../utils";
import "./Property.scss";
import Card from "../../atoms/Card/Card";
import { Grid } from "@material-ui/core";
import List from "../../molecules/list/List";
import IconMapper from "../../atoms/IconMapper/IconMapper";
import BookingPopup from "../../structure/booking-popup/mapping";
import {Button} from "@mui/material";

const bem = cn("property");

export default function PropertyView(props: PropertyViewProps) {
	const { property, getProperty } = props;
	const [openModal, setIsOpen] = useState(false)

	const { id } = useParams();

	useEffect(() => {
		getProperty(id);
	}, [id]);

	const populateList = () => {
		return (
			<>
				{property.hasBreakfast && <div>{IconMapper["breakfast"]} Breakfast</div>}
				{property.hasAirConditioning && <div>{IconMapper["airConditioning"]} Air conditioning</div>}
				{property.hasHeating && <div>{IconMapper["heating"]} Heating</div>}
			</>);
	};

	return (
		<div className={bem("")}>
			<Card>
				<Grid container>
					<Grid item xs={12} sm={12} md={4} lg={6}>
						<div className={bem("container")}>
							<img  src={property.image} className={bem("image")}  />
							<List populateList={populateList} orientation={"horizontal"} />
						</div>
					</Grid>
					<Grid item xs={12} sm={12} md={8} lg={6}>
						<div className={bem("container")}>
							<div>{property.type}</div>
							<h1>{property.name}</h1>
							<div>{property.address?.country}, {property.address?.city}, {property.address?.county}, {property.address?.addressLine1}</div>
							<i>{property.description}</i>
							<h3><b>{property.price?.value} {property.price?.currency}</b></h3>
							<div className={bem("footer")}>
								<Button type={"button"} variant={"outlined"} size={"large"} onClick={() => {
									setIsOpen(true);
								}
								} >Create Booking</Button>
								<BookingPopup price={property?.price?.value} open={openModal} setOpen={setIsOpen}></BookingPopup>
							</div>
						</div>
					</Grid>
				</Grid>
			</Card>
		</div>
	);
}
