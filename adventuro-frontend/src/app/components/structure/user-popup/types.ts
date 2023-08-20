import { User } from "../../../models/User";

export interface UserPopupProps {
	readonly createUser: (user: User) => void;
	readonly editUser: (user: User) => void;
	readonly open: boolean;
	readonly setOpen: (value: boolean) => void;
	readonly isEditMode: boolean;
	readonly setIsEditMode: (value: boolean) => void;
	readonly setUser: (user: User) => void;
	user: User;
}
