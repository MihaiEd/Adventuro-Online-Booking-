import React, {useEffect, useState} from "react";
import routes from "../../../../routes";
import { useLocation } from "react-router-dom";
//styles
import './Toolbar.scss';
import {cn} from "../../../utils";
import Link from "../../atoms/link/Link";
import List from "../../molecules/list/List";
import {HORIZONTAL} from "../../molecules/list/constants";
import {Button, Divider, Stack} from "@mui/material";
import {getLocalStorageElement} from "../../../api/DefaultApi";
import {ROLE} from "../../../variables/constants";


const bem = cn('toolbar');

export default function Toolbar() {

	const currentLocation = useLocation();
	const [isLocationWithInternalNavbar, setLocationWithInternalNavbar]= useState(false)             ;

	useEffect(() => {


	}, [currentLocation.pathname])
	const isVisibleForUser = (role: string[]) => {
		return (role.includes(getLocalStorageElement(ROLE)));
	}

	const populateList = () => {
		return (routes.map((route, index) => !route.hideInNav && isVisibleForUser(route.role) && (
			<Link key={index} value={route.name} href={route.layout + route.path} target={'_self'}/>
		)))
	}

	if (localStorage.getItem('token')) {
		return (
			<div className={bem()}>
				<h3>
					<Link value={'Adventuro'} href={'/introduction'} target={'_self'}></Link>
				</h3>
				<List populateList={populateList} orientation={HORIZONTAL}></List>
				<div className={bem('div-orientation')}>
					<Button type={"button"} variant="outlined" className={bem('button-class')} href={"/logout"} size={"large"}
									color={"error"}>LogOut</Button>
				</div>
			</div>
		)
	} else {
		return (
			<div className={bem()}>
				<h3>
					<Link value={'Adventuro'} href={'/home'} target={'_self'}></Link>
				</h3>
				<List populateList={populateList} orientation={HORIZONTAL}></List>
				<div className={bem('div-orientation')}>
					<Stack spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
						<Button type={"button"} variant="outlined" className={bem('button-class')} href="/login" size={"large"}
										color={"success"}>LogIn</Button>
						<Button type={"button"} variant="outlined" className={bem('button-class')} href="/register"
										size={"large"}>Register</Button>
					</Stack>
				</div>
			</div>
		)
	}
}
