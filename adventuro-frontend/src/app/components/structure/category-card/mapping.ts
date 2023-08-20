import {connect} from "react-redux";
import {setSelectedCategory} from "../../../reducers/categoryReducer";
import CategoryCard from "./CategoryCard";

export const mapStateToProps = (state: any) => ({
	selectedCategory: state.category.selectedCategory
});
export const mapDispatchToProps = {
	selectCategory: setSelectedCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
