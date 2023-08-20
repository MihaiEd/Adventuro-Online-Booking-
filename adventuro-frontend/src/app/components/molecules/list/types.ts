import {Orientation} from "./constants";
import {ReactNode} from "react";


export type Orientation = typeof Orientation[number];

export interface ListProps {
	readonly orientation?: Orientation;
	readonly populateList: () => ReactNode;
}
