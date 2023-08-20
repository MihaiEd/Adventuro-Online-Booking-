import { connect } from "react-redux";
import { createUser, editUser, setUser } from "../../../api/UserApi";
import { UserPopup } from "./UserPopup";

export const mapStateToProps = (state: any) => ({
	user: state.user.currentUser
});

export const mapDispatchToProps = {
	createUser: createUser,
	editUser: editUser,
	setUser: setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPopup);
