import { Property } from "../../../models/Property";

export interface PropertiesPageProps {
	properties: Property[];
	createProperty: (property: Property) => void;
	getAllProperties: () => void;
	setProperty: (property: Property) => void;
	deleteProperty: (property: Property) => void;
	editProperty: (property: Property) => void;
}
