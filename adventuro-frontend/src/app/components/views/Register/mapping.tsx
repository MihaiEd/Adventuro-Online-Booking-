import {connect} from "react-redux";
import {register, setUserRegister} from "../../../api/UserApi";
import RegisterView from "./Register";

export const mapStateToProp = (state: any) => ({
	user: state.user.registerUser
});
export const mapDispatchToProps = {
	doRegister: register,
	setUser: setUserRegister
}
export default connect(mapStateToProp, mapDispatchToProps)(RegisterView);
