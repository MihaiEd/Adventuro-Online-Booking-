import React, { useState } from "react";
import {RegisterProps} from "./types";
import { cn } from "../../../utils";
import RegisterCard from "../../structure/register-card/RegisterCard";
const bem = cn('register')

const RegisterView = (props: RegisterProps) => {
	const {user, doRegister, setUser} = props;

	return (
		<div className={bem()}>
			<RegisterCard setUser={setUser} register={doRegister} user={user}></RegisterCard>
		</div>
	);
};

export default RegisterView;

