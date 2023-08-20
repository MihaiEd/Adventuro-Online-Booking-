import { PropertyPopup } from "./PropertyPopup";
import { connect } from "react-redux";
import { createProperty, editProperty, setProperty } from "../../../api/PropertiesApi";

export const mapStateToProps = (state: any) => ({
	property: state.property.currentProperty
})

export const mapDispatchToProps = {
	createProperty: createProperty,
	editProperty: editProperty,
	setProperty: setProperty
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPopup);
