import {UserRegister} from "../../../models/UserRegister";

export interface RegisterProps {
	readonly user: UserRegister;
	readonly setUser: (user: UserRegister) => void;
	readonly doRegister: (user: UserRegister, history:any) => void;
}
