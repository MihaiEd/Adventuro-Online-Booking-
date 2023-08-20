import {User} from "../../../models/User";


export interface MyAccountProps {
	readonly token?: string;
	user: User;
	getUser:(id:string) => void;
	editUser:(user: User) => void;
	setUser:(user: User) => void;

}
