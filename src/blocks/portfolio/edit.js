import { Fragment } from "@wordpress/element";
import Inspector from "./inspector";
import { FetchPortfolio } from "./fetchApi";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { useState } from "react";

import ImageMedia from "../blog/media";

export default function edit(props) {
	const { attributes, setAttributes } = props;
	const {
		inRow,
		filter,
		mobileView,
		itemBgColoe,
		itemTextColor,
		itemTitleColor,
		portfolioItems,
		perPage,
		selectedCategory,
		orderby,
		order
	} = attributes;

	const [api, setApi] = useState([]);
	const fetched = FetchPortfolio(props);
	setAttributes({ portfolioItems: fetched });

	// if (!portfolioItems) {
	// 	apiFetch({
	// 		path: addQueryArgs(
	// 			`/wp/v2/portfolio?orderby=${orderby}&order=${order}&portfolio_category=${
	// 				selectedCategory ? parseInt(selectedCategory) : ""
	// 			}&per_page=${perPage}`
	// 		)
	// 	})
	// 		.then(res => {
	// 			setApi(res);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// }
	// setAttributes({ portfolioItems: api });
	let displayFields, filters, mdClass;

	switch (inRow) {
		case "2":
			mdClass = " col-md-6";
			break;
		case "3":
			mdClass = " col-md-4";
		case "4":
			mdClass = " col-md-3";
		case "6":
			mdClass = " col-md-2";
		default:
			mdClass = " col-md-4";
			break;
	}

	console.log(attributes);
	// console.log(api);
	if (inRow != "6" || inRow != "4") {
		if (portfolioItems) {
			displayFields = portfolioItems.map(item => {
				return (
					<div
						className={`projects-item ${item.portfolio_categories.map(cat => {
							return cat.slug;
						})} ${mdClass}`}
					>
						<div className="projects-item-wrap">
							<ImageMedia imageId={item.featured_media} />
							<div className="project-hover-bg"></div>
							<div className="project-hover">
								<h3 className="project-title text-uppercase">
									{item.title.rendered}
								</h3>
								<p
									className="project-desc"
									dangerouslySetInnerHTML={{
										__html: item.content.rendered.slice(1, 150) + "..."
									}}
								/>
								<a
									href={item.link}
									rel="noopener noreferrer"
									target="_blank"
									className="btn btn-md"
								>
									Read More
								</a>
							</div>
						</div>
					</div>
				);
			});
		}
	} else {
	}

	return (
		<Fragment>
			<Inspector {...props} />
			{displayFields}
		</Fragment>
	);
}
