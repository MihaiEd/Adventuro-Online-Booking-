import { UserPageProps } from "./types";
import React, { ReactNode, useEffect, useState } from "react";
import Table from "../../molecules/table/Table";
import Button from "../../atoms/button/Button";
import UserPopup from "../../structure/user-popup/mapping";
import { User } from "../../../models";
import { cn } from "../../../utils";
import "./User.scss";
import IconMapper from "../../atoms/IconMapper/IconMapper";

const bem = cn("user");

export default function UserView(props: UserPageProps) {

	const { getAllUsers, users, deleteUser, setUser, response, setResponse } = props;

	const [openModal, setIsOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);

	useEffect(() => {
		getAllUsers();
	}, []);

	useEffect(() => {
		if (response) {
			getAllUsers();
			setIsOpen(false);
			setResponse(null);
		}
	}, [response]);

	const populateHeader = () => {
		return ["Email", "First Name", "Last Name", "Actions"]?.map((value => <th>{value}</th>));
	};

	const populateBody = (): ReactNode => {
		return users?.map((value => <tr>
			<td>{value.email}</td>
			<td>{value.firstName}</td>
			<td>{value.lastName}</td>
			<td><div className={bem('actions')}><Button type={"contained"} onClick={() => {
				setIsOpen(true);
				setIsEditMode(true);
				setUser(value);
			}}>{IconMapper["edit"]}</Button>
				<Button type={"contained"}
								onClick={() => deleteUser(value)}>{IconMapper["delete"]}</Button></div></td>
		</tr>));
	};

	return (
		<div>
			<div className={bem("container")}>
				<Button type={"contained"} label={"Create"} onClick={() => {
					setIsOpen(true);
					setIsEditMode(false);
					setUser({} as User);
				}} />
			</div>
			<UserPopup open={openModal} setOpen={setIsOpen} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
			<Table populateHeader={populateHeader} populateBody={populateBody} />
		</div>
	);
}
