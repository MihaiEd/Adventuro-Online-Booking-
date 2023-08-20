import {connect} from "react-redux";
import CategoriesView from "./Categories";
import {setToolbarActions, setToolbarTitle} from "../../../reducers/toolbarReducer";
import {deleteCategory} from "../../../api/CategoriesApi";
import {setSelectedCategory} from "../../../reducers/categoryReducer";

export const mapStateToProps = (state: any) => ({
	literals: state.literals,
	categories: state.category.categories,
	selectedCategory: state.category.selectedCategory
});
export const mapDispatchToProps = {
	setToolbarTitle: setToolbarTitle,
	setToolbarActions: setToolbarActions,
	deleteCategory: deleteCategory,
	setSelectedCategory: setSelectedCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesView);
