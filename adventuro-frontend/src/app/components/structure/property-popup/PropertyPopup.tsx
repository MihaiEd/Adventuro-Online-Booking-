import Modal from "@material-ui/core/Modal";
import React, {useEffect, useState} from "react";
import { PropertyPopupProps } from "./types";

//styles
import "./PropertyPopup.scss";
import { cn } from "../../../utils";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/button/Button";
import Checkbox from "../../atoms/checkbox/Checkbox";
import {
	TextField, Select, MenuItem, InputLabel, FormControl} from "@material-ui/core";

const bem = cn("property-popup");


const countries = [
	{ name: "Romania", cities: ["Bucharest", "Cluj-Napoca", "Timisoara", "Iasi"],},
	{ name: "Germany", cities: ["Berlin", "Munich", "Hamburg", "Frankfurt"],},
	{ name: "France", cities: ["Paris", "Marseille", "Lyon", "Toulouse"],},
	{ name: "Italy", cities: ["Rome", "Milan", "Naples", "Turin"],},
	{ name: "Spain", cities: ["Madrid", "Barcelona", "Valencia", "Seville"],},
];
export function PropertyPopup(props: PropertyPopupProps) {
	const { open, setOpen, editProperty, createProperty, property, isEditMode, setIsEditMode, setProperty } = props;

	const [selectedCountry, setSelectedCountry] = useState("");
	const [cities, setCities] = useState<string[]>([]);


	useEffect(() => {
		if (open && property) {
			setIsEditMode(true);
		} else {
			setIsEditMode(false);
		}
	}, []);

	const handleClose = () => {
		setOpen(false);
	};

	const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		const country = event.target.value as string;
		setSelectedCountry(country);

		const selectedCities = countries.find((c) => c.name === country)?.cities || [];
		setCities(selectedCities);

		setProperty({ ...property, address: { ...property?.address, country: country } });
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
					<FormControl variant="outlined">
						<InputLabel id="type-label">Type</InputLabel>
						<Select
							labelId="type-label"
							value={property?.type}
							onChange={(event) => setProperty({ ...property, type: event.target.value as string })}
							label="Type"
						>
							<MenuItem value="Private">Private</MenuItem>
						</Select>
					</FormControl>
					<TextField variant={"outlined"} placeholder="Name" label={"Name"} value={property?.name}
										 onChange={(event) => setProperty({ ...property, name: event.target.value })} />
					<TextField variant={"outlined"} placeholder="Description" label={"Description"} value={property?.description}
										 onChange={(event) => setProperty({ ...property, description: event.target.value })} />
					<TextField variant={"outlined"} placeholder="Image" label={"Image"} value={property?.image}
										 onChange={(event) => setProperty({ ...property, image: event.target.value })} />
					<FormControl variant="outlined">
						<InputLabel id="country-label">Country</InputLabel>
						<Select
							labelId="country-label"
							value={property?.address?.country || selectedCountry}
							onChange={handleCountryChange}
							label="Country"
						>
							{countries.map((country) => (
								<MenuItem key={country.name} value={country.name}>
									{country.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl variant="outlined">
						<InputLabel id="city-label">City</InputLabel>
						<Select
							labelId="city-label"
							value={property?.address?.city}
							onChange={(event) => setProperty({ ...property, address: { ...property?.address, city: event.target.value as string} })}
							label="City"
						>
							{cities.map((city) => (
								<MenuItem key={city} value={city}>
									{city}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField variant={"outlined"} placeholder="County" label={"County"} value={property?.address?.county}
										 onChange={(event) => setProperty({
											 ...property,
											 address: { ...property.address, county: event.target.value }
										 })} />
					<TextField variant={"outlined"} placeholder="Address" label={"Address"}
										 value={property?.address?.addressLine1} onChange={(event) => setProperty({
						...property,
						address: { ...property.address, addressLine1: event.target.value }
					})} />
					<TextField variant={"outlined"} placeholder="Postal Code" label={"Postal Code"}
										 value={property?.address?.postalCode} onChange={(event) => setProperty({
						...property,
						address: { ...property.address, postalCode: event.target.value }
					})} />
					<TextField variant={"outlined"} placeholder="Value" label={"Value"} value={property?.price?.value}
										 onChange={(event) => setProperty({
											 ...property,
											 price: { ...property.price, value: Number(event.target.value) }
										 })} />
					<FormControl variant="outlined">
						<InputLabel id="currency-label">Currency</InputLabel>
						<Select
							labelId="currency-label"
							value={property?.price?.currency}
							onChange={(event) =>
								setProperty({ ...property, price: { ...property?.price, currency: event.target.value as string } })
							}
							label="Currency"
						>
							<MenuItem value="RON">RON</MenuItem>
							<MenuItem value="EUR">EUR</MenuItem>
							<MenuItem value="USD">USD</MenuItem>
						</Select>
					</FormControl>
					<div className={bem("form")}>
						<Checkbox value={property?.hasBreakfast} text={"Breakfast"} disabled={false}
											setValue={value => setProperty({ ...property, hasBreakfast: value })} />
						<Checkbox value={property?.hasAirConditioning} text={"Air Conditioning"} disabled={false}
											setValue={value => setProperty({ ...property, hasAirConditioning: value })} />
						<Checkbox value={property?.hasHeating} text={"Heating"} disabled={false}
											setValue={value => setProperty({ ...property, hasHeating: value })} />
					</div>
					<Button type={"contained"} label={isEditMode ? "Edit" : "Create"}
									onClick={() => isEditMode ? editProperty(property) : createProperty(property) } />
				</Card>
			</div>
		</Modal>
	);
}
