import * as React from "react";
import { PropertiesCardProps } from "./types";
import { cn } from "../../../utils";
import './PropertiesCard.scss'
import Card from "../Card/Card";

const bem = cn('properties-card');

export default function PropertiesCard(props: PropertiesCardProps) {

	const {property} = props;

	return (
		 <div className={bem('')}>
			<Card>
				<div className={bem('image')}>
					<img src={property.image}/>
				</div>
				<div className={'header'}>
					<div>
						<h1>{property.name}</h1>
						{/*<h2>{property.type}</h2>*/}
					</div>
					<div className={'price'}>
						<h4>{property.price?.value}</h4>
						<h5>{property.price?.currency}</h5>
					</div>
				</div>
				<div className={'description'}>
					<p>{property.description}</p>
				</div>
			</Card>
			</div>
	)
}
