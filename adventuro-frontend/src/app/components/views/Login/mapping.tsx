import {connect} from "react-redux";
import LoginView from "./Login";
import {login} from "../../../api/UserApi";


export const mapStateToProps = (state: any) => ({
	token: state.user.token
});

export const mapDispatchToProps = {
	doLogin: login
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
