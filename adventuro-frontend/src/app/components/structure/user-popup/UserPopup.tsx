import {UserPopupProps} from "./types";
import React, {useEffect, useState} from "react";
import Modal from "@material-ui/core/Modal";

//styles
import './UserPopup.scss';
import { cn } from "../../../utils";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/button/Button";
import {TextField, Select, MenuItem, InputLabel, FormControl} from "@material-ui/core";

const bem = cn('user-popup');

export function UserPopup(props: UserPopupProps) {
	const {open, setOpen, editUser, createUser, user, isEditMode, setIsEditMode, setUser} = props;

	const [selectedRole, setSelectedRole] = useState("");

	useEffect(() => {
		if (open && user) {
			setIsEditMode(true);
		} else {
			setIsEditMode(false);
		}
	}, [])

	const handleCreateUser = () => {
		user.role = selectedRole;
		createUser(user);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Modal open={open} onClose={(reason) => {
			if (reason !== 'backDropClick'){
				handleClose();
			}
		}}>
				<div className={bem()}>
					<Card>
							<div className={bem('close')}>
								<Button type={"default"} label={'X'} onClick={() => setOpen(false)}/>
							</div>
								<TextField variant={"outlined"} placeholder="E-mail" label={"E-mail"} value={user?.email} onChange={(event) => setUser({...user, email: event.target.value})}/>
								<TextField variant={"outlined"} placeholder="First Name" label={"First Name"} value={user?.firstName} onChange={(event) => setUser({...user, firstName: event.target.value})}/>
								<TextField variant={"outlined"} placeholder="Last Name" label={"Last Name"} value={user?.lastName} onChange={(event) => setUser({...user, lastName: event.target.value})}/>
						{!isEditMode && (
							<>
							<FormControl variant="outlined">
								<InputLabel id="country-label">Role</InputLabel>
								<Select
									variant="outlined"
									value={selectedRole}
									onChange={(event) => setSelectedRole(event.target.value as string)}
									label="Role"
								>
									<MenuItem value="Admin">Admin</MenuItem>
									<MenuItem value="Owner">Owner</MenuItem>
									<MenuItem value="Client">Client</MenuItem>
								</Select>
							</FormControl>
								<TextField variant={"outlined"} placeholder="Password" label={"Password"} onChange={(event) => setUser({...user, password: event.target.value})}/>
							</>
						)}
								<Button type={"contained"} label={isEditMode? 'Edit' : 'Create'} onClick={() => isEditMode? editUser(user) : handleCreateUser()}/>
					</Card>
				</div>
			</Modal>
	)
}
