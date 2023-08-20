import React, {useState} from "react";
import Drawer from "../../atoms/Drawer/Drawer";
import Button from "../../atoms/button/Button";
import {ButtonDrawerProps} from "./types";



export default function ButtonDrawer(props:ButtonDrawerProps) {
	const [openDrawer, setIsOpenDrawer] = useState(false);
	const {children} = props;
	return (
		<>
			<Button type={"contained"} label={'Open drawer'} onClick={() => setIsOpenDrawer(true)}></Button>
			<Drawer isDrawerOpen={openDrawer} setIsDrawerOpen={setIsOpenDrawer}>
				<div>{children}</div>
			</Drawer >
		</>
	)
}
