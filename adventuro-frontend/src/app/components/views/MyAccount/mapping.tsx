import { connect } from "react-redux";
import {editUser, getUser, setUser} from "../../../api/MyAccountApi";
import MyAccountView from "./MyAccount";

export const mapStateToProps = (state: any) => ({
	user: state.user.currentUser
});

export const mapDispatchToProps = {
	editUser: editUser,
	getUser: getUser,
	setUser: setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountView);
