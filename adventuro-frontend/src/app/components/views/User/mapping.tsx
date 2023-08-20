import { connect } from "react-redux";
import UserView from "./User";
import { createUser, deleteUser, editUser, getAllUsers, setResponse, setUser } from "../../../api/UserApi";

export const mapStateToProps = (state: any) => ({
	users: state.user.users,
	response: state.user.response
});

export const mapDispatchToProps = {
	createUser: createUser,
	getAllUsers: getAllUsers,
	deleteUser: deleteUser,
	editUser: editUser,
	setUser: setUser,
	setResponse: setResponse
}

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
