import {UserLogin} from "../../../models";

export interface LoginProps {
	readonly token?: string;
	readonly doLogin: (user: UserLogin) => void;
	readonly checkUser: UserLogin;
}
