import * as React from "react";
import {RefObject, useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import { makeStyles } from "@material-ui/core/styles";
import routes from "../../../routes";
import mainStyle from "../../../styles/material-dashboard-react/layouts/mainStyle";
import {connect} from "react-redux";
import Toolbar from "../structure/toolbar/mapping";
import {ROLE, TOKEN} from "../../variables/constants";
import {getLocalStorageElement} from "../../api/DefaultApi";
import {useHistory} from "react-router-dom";

let ps: any;

const switchRoutes = (
	<Switch>
		{routes.map((prop: any, key: any) => {
			return (
				<Route exact
							 path={prop.layout + prop.path}
							 component={prop.component}
							 key={key}
				/>
			);
		})}
		<Redirect from="/*" to="/introduction" />
	</Switch>
);

const useStyles = makeStyles(mainStyle as any);

function MainComponent({ literals }: any) {
	// styles
	const classes = useStyles({} as any);
	// ref to help us initialize PerfectScrollbar on windows devices
	const mainPanel: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
	// states and functions
	const [image, setImage] = React.useState("http://static.softwareengineer.ro/bg-image-menu.jpg");
	const [color, setColor] = React.useState("blue");
	const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleImageClick = (image: any) => {
		setImage(image);
	};
	const handleColorClick = (color: string) => {
		setColor(color);
	};
	const handleFixedClick = () => {
		if (fixedClasses === "dropdown") {
			setFixedClasses("dropdown show");
		} else {
			setFixedClasses("dropdown");
		}
	};
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const getRoute = () => {
		return window.location.pathname !== "/admin/maps";
	};
	const resizeFunction = () => {
		if (window.innerWidth >= 960) {
			setMobileOpen(false);
		}
	};

	const showNav = () => {
		return !(window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/logout' );
	}

	const history = useHistory();


	useEffect(() => {
		const role = getLocalStorageElement(ROLE);
		const token = getLocalStorageElement(TOKEN);
		const path = window.location.pathname;

		if (path === '/logout' && !token) {
			return (history.push('/login'))
		}

		if (path !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/introduction' && !token) {
			return (history.push('/introduction'))
		}
		if (path === '/properties' && (role !== 'Owner' && role!=='Admin')) {
			return (history.push('/home'))
		}
		if (path === '/user' && role !== 'Admin') {
			return (history.push('/home'))
		}
	})

	// initialize and destroy the PerfectScrollbar plugin
	React.useEffect(() => {
		if (navigator.platform.indexOf("Win") > -1) {

			ps = new PerfectScrollbar(mainPanel.current, {
				suppressScrollX: true,
				suppressScrollY: false
			});

			document.body.style.overflow = "hidden";
		}
		window.addEventListener("resize", resizeFunction);
		// Specify how to clean up after this effect:
		return function cleanup() {
			if (navigator.platform.indexOf("Win") > -1) {
				ps.destroy();
			}
			window.removeEventListener("resize", resizeFunction);
		};
	}, [mainPanel]);
	return (
		<div className={classes.wrapper}>
			<div className={classes.mainPanel} ref={mainPanel}>
				{/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
				<div className={classes.content}>
					{showNav() && <Toolbar/>}
					<div className={classes.container}>{switchRoutes}</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = ({ literals }: any) => ({
	literals
});

export default connect(mapStateToProps)(MainComponent);
