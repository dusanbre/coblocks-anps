import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { useState } from "react";

export function FetchPortfolio(attributes) {
	const [api, setApi] = useState([]);

	apiFetch({
		path: addQueryArgs(
			`/wp/v2/portfolio?orderby=${attributes.orderby}&order=${
				attributes.order
			}&portfolio_category=${
				attributes.selectedCategory ? parseInt(attributes.selectedCategory) : ""
			}&per_page=${attributes.perPage}`
		)
	})
		.then(res => {
			setApi(res);
		})
		.catch(err => {
			console.log(err);
		});

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
