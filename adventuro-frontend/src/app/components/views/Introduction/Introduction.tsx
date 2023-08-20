import * as React from "react";
import {Button} from "@mui/material";
import {cn} from "../../../utils";
import "./Introduction.scss"
import { Box, Typography } from '@mui/material';
import Card from "../../atoms/Card/Card";


export default function  Introduction() {

	const backgroundImageUrl = "path/to/your/image.jpg";
	const bem = cn ('introduction');

	return (
		<div className={bem("")}>
			<div
				className="background-image"
				style={{ backgroundImage: `url(${backgroundImageUrl})` }}
			></div>
			<div className="welcome">
				<h3>Bine ati venit la Adventuro!</h3>
			</div>
		</div>
	);
}
