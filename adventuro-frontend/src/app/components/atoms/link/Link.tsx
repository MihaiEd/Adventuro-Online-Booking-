import * as React from "react";
import {LinkProps} from "./types";
import { Link as RouterLink} from "@material-ui/core";

//styles
import "./Link.scss";
import {cn} from "../../../utils";


const bem = cn('link');

export default function Link(props: LinkProps) {

	const {href, target, value} = props;

	return (
		<RouterLink className={bem('')} href={href} target={target}>
			{value}
		</RouterLink>
	)
}
