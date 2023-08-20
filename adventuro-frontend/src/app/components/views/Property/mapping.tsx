import { getProperty, setProperty } from "../../../api/PropertyApi";
import { connect } from "react-redux";
import PropertyView from "./Property";

export const mapStateToProps = (state: any) => ({
	property: state.property.currentProperty
});

export const mapDispatchToProps = {
	getProperty: getProperty,
	setProperty: setProperty
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyView);
