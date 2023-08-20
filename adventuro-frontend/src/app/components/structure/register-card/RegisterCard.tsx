import {cn} from "../../../utils";
import {RegisterCardProps} from "./types";
import React, {useEffect, useState} from "react";

//styles
import './RegisterCard.scss'
import Card from "../../atoms/Card/Card";
import {Checkbox, FormControl, FormControlLabel, FormGroup,  Input} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Button} from "@mui/material";
import Link from "../../atoms/link/Link";

const bem = cn('register');

export default function RegisterCard(props: RegisterCardProps) {

	const {register, user, setUser} = props;

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [passwordError, setPasswordError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [firstNameError, setFirstNameError] = useState('');
	const [lastNameError, setLastNameError] = useState('');
	const [registerError, setRegisterError] = useState(null);

	const [isChecked, setIsChecked] = useState(false);
	const [checkboxError, setCheckboxError] = useState('');

	const history = useHistory();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const onChangeFirstName = (e:any) => {
		const firstName = e.target.value;
		console.log(firstName);
		setFirstName(firstName);
		setUser({...user, firstName: firstName})
	};


	const onChangeLastName = (e:any) => {
		const lastName = e.target.value;
		setLastName(lastName);
		setUser({...user, lastName: lastName})
	};

	const onChangeEmail = (e:any) => {
		const email = e.target.value;
		setEmail(email);
		setUser({...user, email: email})
	};

	const onChangePassword = (e:any) => {
		const password = e.target.value;
		setPassword(password);
		setUser({...user, password: password})
	};

	const onRegisterClick = () => {
		let isValid = true;
		if (password.length < 6) {
			setPasswordError('Password must be at least 6 characters');
			isValid = false;
		} else {
			setPasswordError('');
		}

		if (!emailRegex.test(email)) {
			setEmailError('Invalid email format');
			isValid = false;
		} else {
			setEmailError('');
		}

		if (firstName.length < 3 ) {
			setFirstNameError('First name must be at least 3 characters');
			isValid = false;
		} else {
			setFirstNameError('');
		}

		if (lastName.length < 3) {
			setLastNameError('Last name must be at least 3 characters');
			isValid = false;
		} else {
			setLastNameError('');
		}

		if (!isChecked) {
			setCheckboxError('You must agree to the terms and conditions');
			isValid = false;
		} else {
			setCheckboxError('');
		}

	if (isValid) {
		register(user, history);
		setRegisterError('Email already exist')
	}
	}

	useEffect(() => {console.log(user)}, [user])

	return (
		<div className={bem('container')}>
			<Card>
				<img
					src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
					alt="profile-img"
					className={bem('profile-img-card')}
				/>
				<h1>Sign Up</h1>
				<Input value={firstName} placeholder={'First Name'} onChange={(event => onChangeFirstName(event))}/>
				{firstNameError && <p className="error-message">{firstNameError}</p>}
				<Input value={lastName} placeholder={'Last Name'} onChange={(event => onChangeLastName(event))}/>
				{lastNameError && <p className="error-message">{lastNameError}</p>}
				<Input value={email} placeholder={'Email'} onChange={(event => onChangeEmail(event))}/>
				{emailError && <p className="error-message">{emailError}</p>}
				<Input value={password} placeholder={'Password'} type={'password'} onChange={(event => onChangePassword(event))}/>
				{passwordError && <p className="error-message">{passwordError}</p>}
				<FormControl component="fieldset">
					<FormGroup aria-label="position" row>
						<FormControlLabel
							value="end"
							control={<Checkbox checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} />}
							label="Sunt de acord cu termenii si conditiile"
							labelPlacement="end"
						/>
						{checkboxError && <p className="error-message">{checkboxError}</p>}
					</FormGroup>
				</FormControl>
				{registerError && (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
						<p className="error-message">{registerError}</p>
					</div>
				)}
				<div>
					<Button type={"button"} variant={"outlined"} size={"large"} onClick={onRegisterClick}>Register</Button>
				</div>
				<div className={bem('div-flex')}>
					<p>Already have an account?</p>
					<Link value={'Login here!'} href={'/login'} target={'_self'}/>
				</div>
			</Card>
		</div>
	);
}

