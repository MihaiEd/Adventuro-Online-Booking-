import { getAllProperties } from "../../../api/PropertiesApi";
import HomePageView from "./HomePage";
import { connect } from "react-redux";

export const mapStateToProps = (state: any) => ({
	properties: state.property.properties
})

export const mapDispatchToProps = {
	getAllProperties: getAllProperties
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageView);
