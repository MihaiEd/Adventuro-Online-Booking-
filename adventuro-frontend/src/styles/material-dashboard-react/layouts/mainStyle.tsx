import {
	drawerWidth,
	transition,
	container
} from "../material-dashboard-react";

const mainStyle = (theme: any) => ({
	wrapper: {
		position: "relative",
		top: "0",
		height: "100vh"
	},
	mainPanel: {
		overflow: "auto",
		position: "relative",
		float: "right",
		...transition,
		maxHeight: "100%",
		width: "100%",
		overflowScrolling: "touch"
	},
	content: {
		marginTop: "60px",
		height: "calc(100vh - 60px)"
	},
	container,
	map: {
		marginTop: "70px"
	}
});

export default mainStyle;
