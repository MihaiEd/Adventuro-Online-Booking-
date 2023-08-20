import {ReactNode} from "react";


export interface DrawerProps{
	readonly setIsDrawerOpen: (value: boolean) => void;
	readonly isDrawerOpen: boolean;
	readonly children?: ReactNode | ReactNode[];

}
