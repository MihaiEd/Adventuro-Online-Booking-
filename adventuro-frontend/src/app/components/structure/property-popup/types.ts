import { Property } from "../../../models/Property";

export interface PropertyPopupProps {
	readonly createProperty: (property: Property) => void;
	readonly editProperty: (property: Property) => void;
	readonly open: boolean;
	readonly setOpen: (value: boolean) => void;
	readonly isEditMode: boolean;
	readonly setIsEditMode: (value: boolean) => void;
	readonly setProperty: (property: Property) => void;
	property: Property;
}
