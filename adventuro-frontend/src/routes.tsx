// core components/views
import RegisterView from "./app/components/views/Register/mapping";
import UserView from "./app/components/views/User/mapping";
import LoginView from "./app/components/views/Login/mapping";
import PropertiesView from "./app/components/views/Properties/mapping";
import HomePageView from "./app/components/views/HomePage/mapping";
import MyAccountView from "./app/components/views/MyAccount/mapping";
import PropertyView from "./app/components/views/Property/mapping";
import LogoutView from "./app/components/views/Logout/Logout";
import MyBookingsView from "./app/components/views/MyBookings/mapping";
import BookingsView from "./app/components/views/Bookings/mapping";
import Introduction from "./app/components/views/Introduction/Introduction";

const routes = [
	{
		path: "home",
		name: "Home",
		component: HomePageView,
		layout: "/",
		role: ["Admin", "Owner", "Client"]
	},
	{
		path: "properties",
		name: "Properties",
		component: PropertiesView,
		layout: "/",
		role: ["Admin", "Owner"],
	},
	{
		path: "user",
		name: "User",
		component: UserView,
		layout: "/",
		role: ["Admin"]
	},

	{
		path: "introduction",
		name: "Introduction",
		component: Introduction,
		layout: "/",
		hideInNav: true
	},
	{
		path: "myBookings",
		name: "MyBookings",
		component: MyBookingsView,
		layout: "/",
		role: ["Client"],
	},
	{
		path: "Bookings",
		name: "Bookings",
		component: BookingsView,
		layout: "/",
		role: ["Admin", "Owner"],
	},
	{
		path: "myAccount",
		name: "MyAccount",
		component: MyAccountView,
		layout: "/",
		role: ["Admin", "Owner", "Client"],
	},
	//hidden routes
	{
		path: ":id",
		name: "Properties",
		component: PropertyView,
		layout: "/properties/",
		role: ["Admin", "Owner", "Client"],
		hideInNav: true
	},
	{
		path: "login",
		name: "Login",
		component: LoginView,
		layout: "/",
		hideInNav: true
	},
	{
		path: "register",
		name: "Register",
		component: RegisterView,
		layout: "/",
		hideInNav: true
	},
	{
		path: "logout",
		name: "Logout",
		component: LogoutView,
		layout: "/",
		hideInNav: true
	},
];

export default routes;
