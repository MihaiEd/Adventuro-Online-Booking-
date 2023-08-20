import {connect} from "react-redux";
import { register } from "../../../api/UserApi";
import RegisterCard from "./RegisterCard";

export const mapStateToProps = (state: any) => ({
	users: state.user.users
});

export const mapDispatchToProps = {
	register: register
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterCard);
