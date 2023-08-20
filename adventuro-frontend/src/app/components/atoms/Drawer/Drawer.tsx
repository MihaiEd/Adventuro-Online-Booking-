import { Drawer as DefaultDrawer } from '@material-ui/core';
import * as React from "react";
import {DrawerProps} from "./types";

//styles
import "./Drawer.scss";
import {cn} from "../../../utils";

const bem = cn('drawer');

export default function Drawer(props:DrawerProps){
	const {setIsDrawerOpen,isDrawerOpen,children} = props;
return(

		<DefaultDrawer
			anchor="left"
			open={isDrawerOpen}
			onClose={()=>setIsDrawerOpen(false)}
		>
			<div className={bem('')}>{children}</div>
		</DefaultDrawer>

	)
}
