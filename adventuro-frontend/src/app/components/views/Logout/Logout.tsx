import React, {useEffect} from "react";
import Loader from "../../atoms/Loader/Loader";
import Card from "../../atoms/Card/Card";
import {cn} from "../../../utils";
import {logout} from "../../../api/UserApi";
import {useHistory} from "react-router-dom";

const bem = cn('login');

export default function LogoutView() {

	const history = useHistory();

	useEffect(() => {
		setTimeout(() => {
			logout(history.push('/login'));
		}, 1000)
	}, []);

	return(
		<div>
			<div className={bem()}>
				<Card>
					<img
						src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
						alt="profile-img"
						className={bem('profile-img-card')}
					/>
					<h1>Logging Out</h1>
					<div>
						<Loader></Loader>
					</div>
				</Card>
			</div>
		</div>
	)
}
