import {UserRegister} from "../../../models/UserRegister";

export interface RegisterCardProps {
	readonly register: (userRegister: UserRegister, history: any) => void;
	readonly user: UserRegister;
	readonly setUser: (user: UserRegister) => void;
}
