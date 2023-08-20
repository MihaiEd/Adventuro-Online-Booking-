import React from "react";
import './Pagination.scss'

class Pagination extends React.Component<{ postPerPage: any, totalPosts: any, setCurrentPage: any, currentPage: any }> {
	render() {


		let {postPerPage, totalPosts, setCurrentPage, currentPage} = this.props;
		let pageNumbers = [];
		for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
			pageNumbers.push(i);
		}
		return (
			<div className={'pagination'}>
				{
					pageNumbers.map((page, index) => {
						return <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? 'active' : ''}>{page}</button>
					})
				}
			</div>
		)
	}
}

export default Pagination
