import {connect} from "react-redux";
import Toolbar from "./Toolbar";

export const mapStateToProps = (state: any) => ({
	literals: state.literals,
	toolbarActions: state.toolbar.toolbarActions
});
export default connect(mapStateToProps)(Toolbar);
