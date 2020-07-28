import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { useState } from "react";

export function FetchPortfolio({ attributes, setAttributes }) {
	const [api, setApi] = useState([]);
	const { perPage, selectedCategory, orderby, order } = attributes;

	if (!attributes.portfolioItems) {
		apiFetch({
			path: addQueryArgs(
				`/wp/v2/portfolio?orderby=${attributes.orderby}&order=${
					attributes.order
				}&portfolio_category=${
					attributes.selectedCategory
						? parseInt(attributes.selectedCategory)
						: ""
				}&per_page=${attributes.perPage}`
			)
		})
			.then(res => {
				if (res) {
					setApi(res);
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	// if (fetch) {
	// 	setAttributes({ portfolioItems: fetch });
	// }
	// const query = {
	// 	per_page: perPage,
	// 	portfolio_category: [selectedCategory],
	// 	orderby: orderby,
	// 	order: order,
	// 	status: "publish"
	// };
	// const getPosts = wp.data
	// 	.select("core")
	// 	.getEntityRecords("postType", "portfolio", query);

	// setAttributes({
	// 	portfolio: getPosts
	// });
	// console.log(fetch);
	return api;
}

export function FetchCategories() {
	const [api, setApi] = useState([]);

	if (api.length === 0) {
		apiFetch({
			path: addQueryArgs("/wp/v2/portfolio_category")
		})
			.then(res => {
				setApi(res);
			})
			.catch(err => {
				console.log(err);
			});
	}

	return api;
}
