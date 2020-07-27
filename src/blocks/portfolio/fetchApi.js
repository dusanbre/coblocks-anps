import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { useState } from "react";

export function FetchPortfolio(attributes) {
	var query = {
		per_page: attributes.perPage ? attributes.perPage : -1,
		// order: attributes.order ? attributes.order : "asc",
		// orderby: attributes.orderby ? attributes.orderby : "date",
		status: "publish",
		categories: attributes.selectedCategory ? attributes.selectedCategory : ""
	};
	const getPort = wp.data
		.select("core")
		.getEntityRecords("postType", "portfolio", query);
	return getPort;

	// return api;
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
