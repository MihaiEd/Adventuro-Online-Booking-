import {Types} from "./constants";
import { ReactNode } from "react";

export type Type = typeof Types[number];

export interface ButtonProps {
	readonly label?: string;
	readonly onClick?: () => void;
	readonly type: Type;
	readonly children?: ReactNode | ReactNode[];
}
