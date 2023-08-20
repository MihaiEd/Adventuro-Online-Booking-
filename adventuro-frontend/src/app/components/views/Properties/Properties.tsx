import { PropertiesPageProps } from "./types";
import React, { ReactNode, useEffect, useState } from "react";
import Table from "../../molecules/table/Table";
import { cn } from "../../../utils";
import "./Properties.scss";
import Button from "../../atoms/button/Button";
import PropertyPopup from "../../structure/property-popup/mapping";
import { Property } from "../../../models/Property";
import Checkbox from "../../atoms/checkbox/Checkbox";
import IconMapper from "../../atoms/IconMapper/IconMapper";

const bem = cn("properties");

export default function PropertiesView(props: PropertiesPageProps) {

	const { properties, getAllProperties, setProperty, deleteProperty } = props;

	const [openModal, setIsOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);

	const populateHeader = () => {
		return ["Type", "Name", "Description", "Has Breakfast", "Has Air Conditioning", "Has Heating", "Owner", "Address", "Price", "Actions"]?.map((value =>
			<th>{value}</th>));
	};

	useEffect(() => {
		getAllProperties();
	}, []);

	const populateBody = (): ReactNode => {
		return properties?.map((value => <tr>
			<td>{value.type}</td>
			<td>{value.name}</td>
			<td>{value.description}</td>
			<td><Checkbox value={value.hasBreakfast} disabled={true} /></td>
			<td><Checkbox value={value.hasAirConditioning} disabled={true} /></td>
			<td><Checkbox value={value.hasHeating} disabled={true} /></td>
			<td>{value.user.firstName} {value.user.lastName}</td>
			<td>{value.address.country}, {value.address.city}, {value.address.county}, {value.address.addressLine1}, {value.address.postalCode}</td>
			<td>{value.price.value} {value.price.currency}</td>
			<td>
				<div className={bem("actions")}><Button type={"contained"} onClick={() => {
					setIsOpen(true);
					setIsEditMode(true);
					setProperty(value);
				}}>{IconMapper["edit"]}</Button>
				<Button type={"contained"}
								onClick={() => deleteProperty(value)}>{IconMapper["delete"]}</Button></div>
			</td>
		</tr>));
	};

	return (
		<div>
			<div className={bem("container")}>
				<Button type={"contained"} label={"Create"} onClick={() => {
					setIsOpen(true);
					setIsEditMode(false);
					setProperty({} as Property);

				}} />
			</div>
			<PropertyPopup open={openModal} setOpen={setIsOpen} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
			<Table populateHeader={populateHeader} populateBody={populateBody} />
		</div>
	);
}
