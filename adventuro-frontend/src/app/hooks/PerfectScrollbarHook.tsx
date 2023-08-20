// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {RefObject, useEffect, useRef} from "react";

const usePerfectScrollbar = () => {
	let container: RefObject<HTMLDivElement> = useRef(null);

	useEffect(() => {
		if (container) new PerfectScrollbar(container?.current);

		return () => {
			container = null;
		}
	}, [container]);

	return {
		container
	};
};

export default usePerfectScrollbar;
