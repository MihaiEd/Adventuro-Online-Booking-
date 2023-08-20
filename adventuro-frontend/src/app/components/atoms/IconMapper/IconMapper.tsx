import React from "react";

interface Icons {
	[key: string]: JSX.Element;
}

const IconMapper: Icons = {
	delete: <img src={"/assets/Delete.svg"} />,
	edit: <img src={"/assets/Edit.svg"} />,
	breakfast: <img src={"/assets/Breakfast.svg"} />,
	heating: <img src={"/assets/Heating.svg"} />,
	airConditioning: <img src={"/assets/AirConditioning.svg"} />
};

export default IconMapper;
