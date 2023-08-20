import { Property } from "../../../models/Property";

export interface HomePageProps {
	properties: Property[];
	getAllProperties: () => void;
}
