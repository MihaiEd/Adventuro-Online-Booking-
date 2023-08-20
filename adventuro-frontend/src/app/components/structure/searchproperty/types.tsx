import {Property} from "../../../models/Property";

export interface SearchPropertyProps {
	readonly properties?: Property[];
	readonly setProperties?: (properties: Property[]) => void;
}
