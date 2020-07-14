import { Spinner } from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";

import Slider from "./components/slider";

function display(props) {
	const { attributes, setAttributes } = props;
	const { num_post, posts, cat_ids } = attributes;

	const query = {
		per_page: num_post,
		status: "publish",
		categories: cat_ids,
		orderby: "date",
		order: "desc"
	};

	const getPosts = wp.data
		.select("core")
		.getEntityRecords("postType", "post", query);

	setAttributes({
		posts: getPosts
	});

	return <Fragment>{posts ? <Slider {...props} /> : <Spinner />}</Fragment>;
}

export default withSelect((select, props) => {
	return {
		posts: select("core").getEntityRecords("postType", "post", {
			per_page: -1
		})
	};
})(display);
