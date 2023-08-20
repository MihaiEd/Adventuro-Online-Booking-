import {createCategory, editCategory} from "../../../api/CategoriesApi";
import {connect} from "react-redux";
import {CategoryPopup} from "./CategoryPopup";
import {setSelectedCategory} from "../../../reducers/categoryReducer";

export const mapStateToProps = (state: any) => ({
	literals: state.literals,
	selectedCategory: state.category.selectedCategory,
	categories: state.category.categories
});
export const mapDispatchToProps = {
	createCategory: createCategory,
	editCategory: editCategory,
	setSelectedCategory: setSelectedCategory
}
// export default connect(mapStateToProps, mapDispatchToProps)(CategoryPopup);
