import PropertiesView from "./Properties";
import { connect } from "react-redux";
import {
	createProperty,
	deleteProperty,
	editProperty,
	getAllProperties,
	setProperty
} from "../../../api/PropertiesApi";

export const mapStateToProps = (state: any) => ({
	properties: state.property.properties,
});

export const mapDispatchToProps = {
	createProperty: createProperty,
	getAllProperties: getAllProperties,
	deleteProperty: deleteProperty,
	editProperty: editProperty,
	setProperty: setProperty,
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesView);
