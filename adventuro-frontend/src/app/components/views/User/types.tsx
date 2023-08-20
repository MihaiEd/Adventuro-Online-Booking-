import { User } from "../../../models";

export interface UserPageProps {
	users: User[];
	createUser: (user: User) => void;
	getAllUsers: () => void;
	setUser: (user: User) => void;
	deleteUser: (user: User) => void;
	editUser: (user: User) => void;
	response: string;
	setResponse: (response: string) => void;
}
