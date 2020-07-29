import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { useState } from "react";

//asdsad
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
