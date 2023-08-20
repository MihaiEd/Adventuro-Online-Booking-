import * as React from 'react';
import { Grid } from "@material-ui/core";
import { ResponsiveGridProps } from "./types";

export default function ResponsiveGrid(props: ResponsiveGridProps) {

	const {children} = props;

	return (
			<Grid container>
				{children}
			</Grid>
	);
}
