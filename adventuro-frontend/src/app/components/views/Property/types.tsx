import { Property } from "../../../models/Property";

export interface PropertyViewProps {
	property: Property;
	getProperty: (id: string) => void;
	setProperty: (property: Property) => void;
}
