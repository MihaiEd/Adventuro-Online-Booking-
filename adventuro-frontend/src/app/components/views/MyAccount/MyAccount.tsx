import React, {ChangeEvent, useEffect, useState} from "react";
import {MyAccountProps} from "./types";
import {getLocalStorageElement} from "../../../api/DefaultApi";
import {ID} from "../../../variables/constants";
import './MyAccount.scss';
import {cn} from "../../../utils";
import { Input } from "@material-ui/core";
import Card from "../../atoms/Card/Card";
import {Button} from "@mui/material";

const bem = cn("myaccount")

export default function MyAccountView(props: MyAccountProps) {


	const [firstName, changeFirstName] = useState('');
	const [lastName, changeLastName] = useState('');

	const {user, getUser, editUser, setUser} = props;

	useEffect(() => {
		getUser(getLocalStorageElement(ID));
	}, []);

	useEffect(() => {
		changeFirstName((user.firstName));
		changeLastName(user.lastName);
	}, [user]);

	const onChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
		setUser({...user, firstName: event.target.value})
	}

	const onChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
		setUser({...user, lastName: event.target.value})
	}


	return (
		<div className={bem()}>
			<Card>
				<h1>My profile</h1>
				<br></br>
			<img className={bem('image')}
					 src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
					 alt="profile-img"/>
			<h1>{`${user?.firstName || ''} ${user?.lastName || ''}`}</h1>
			<Input value={firstName} placeholder={'FirstName'} onChange={onChangeFirstName}/>
			<Input value={lastName} placeholder={'LastName'} onChange={onChangeLastName}/>
			<div>
				<Button className={'css-9y1egq-MuiButtonBase-root-MuiButton-roo'} type={"button"} variant={'outlined'} size={'large'}  onClick={() => editUser(user)}>Save Changes</Button>
			</div>
			</Card>
		</div>
	)

}
