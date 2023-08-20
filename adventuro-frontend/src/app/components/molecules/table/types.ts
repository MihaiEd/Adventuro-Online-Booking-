import { ReactNode } from "react";

export interface TableProps {
		readonly populateHeader: () => ReactNode;
		readonly populateBody: () => ReactNode;
}
