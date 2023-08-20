import React, {useEffect, useState} from "react";
import {LoginProps} from "./types";
import {useHistory} from "react-router-dom";
import Link from "../../atoms/link/Link";
import {cn} from "../../../utils";

//styles
import "./Login.scss"
import {Input} from "@material-ui/core";
import Card from "../../atoms/Card/Card";
import {Button} from "@mui/material";
import {getLocalStorageElement} from "../../../api/DefaultApi";

const bem = cn('login');

export default function LoginView(props: LoginProps) {

	const {doLogin,  token} = props;
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [formErrors, setFormErrors] = useState({ email: "", password: "", login: "" });

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const onLoginClick = () => {
		let isValid = true;
		const errors = { email: "", password: "", login: "" };

		// Verificare email
		if (email === "") {
			errors.email = "Email is required";
			isValid = false;
		} else if (!emailRegex.test(email)) {
			errors.email = "Invalid email format";
			isValid = false;
		}

		// Verificare parolă
		if (password === "") {
			errors.password = "Password is required";
			isValid = false;
		}

		if (isValid) {
			doLogin({ email: email, password: password });
			errors.login = "Email or password is incorrect";
			setFormErrors(errors);
		} else {
			if (errors.email !== "") {
				// Afișează mesajul de eroare specific pentru câmpul de email
				setFormErrors(errors);
			} else if (errors.password !== "") {
				// Afișează mesajul de eroare specific pentru câmpul de parolă
				setFormErrors(errors);
			} else {
				// Afișează mesajul de eroare generic pentru login

			}
		}
	};

	useEffect(() => {
		console.log(token);
		if (token && getLocalStorageElement('token')) {
			history.push('/home');
		}
	}, [token]);

	return (
		<div className={bem()}>
			<Card>
				<img
					src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
					alt="profile-img"
					className={bem('profile-img-card')}
				/>
				<h1>Log In</h1>
				<Input
					value={email}
					placeholder="Email"
					onChange={(event) => {
						setEmail(event.target.value);
						setFormErrors({ ...formErrors, email: "" });
					}}
				/>
				{formErrors.email && <p className="error">{formErrors.email}</p>}


				<Input
					value={password}
					placeholder="Password"
					type="password"
					onChange={(event) => {
						setPassword(event.target.value);
						setFormErrors({ ...formErrors, password: "" });
					}}
				/>
				{formErrors.password && <p className="error">{formErrors.password}</p>}

				<div>
					<Button type={"button"} variant={"outlined"} color={"success"} size={"large"} onClick={onLoginClick}>Login</Button>
				</div>
				{formErrors.login && <p className="error">{formErrors.login}</p>}
				<div className={bem('div-flex')}>
					<p>Need a new account?</p>
					<Link value={'Register here!'} href={'/register'} target={'_self'}/>
				</div>
			</Card>
		</div>
	)
}
