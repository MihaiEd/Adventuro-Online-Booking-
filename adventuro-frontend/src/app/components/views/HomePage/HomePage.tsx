import {Grid} from "@material-ui/core";
import * as React from "react";
import ResponsiveGrid from "../../molecules/grid/Grid";
import PropertiesCard from "../../atoms/PropertiesCard/PropertiesCard";
import {HomePageProps} from "./types";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {SearchProperty} from "../../structure/searchproperty/SearchProperty";


export default function HomePageView(props: HomePageProps) {

	const {properties, getAllProperties} = props;

	const [currentProperties, setCurrentProperties] = useState(properties);
	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(10);


	const history = useHistory();

	useEffect(() => {
		getAllProperties();
	}, []);

	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const currentPosts = properties.slice(indexOfFirstPost, indexOfLastPost)

	useEffect(() => {
		setCurrentProperties(properties);
	}, [properties]);

	// Get current posts


	return (
		<>
			<SearchProperty properties={properties} setProperties={setCurrentProperties}></SearchProperty>
			<ResponsiveGrid>
				{currentProperties?.map((property, index) => (
					<Grid item xs={6} sm={4} md={4} lg={3} key={index}>
						<div onClick={() => history.push(`/properties/${property.id}`)}>
							<PropertiesCard property={property}/>
						</div>
					</Grid>
				))}
			</ResponsiveGrid>

		</>);

}
