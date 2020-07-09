import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { useState, Fragment } from "@wordpress/element";

export default function comment({ postId }) {
	const [comment, setComment] = useState();

	if (!comment) {
		if (postId && postId !== 0) {
			apiFetch({
				path: addQueryArgs(`/wp/v2/comments/?post=${postId}`)
			})
				.then(res => {
					setComment(res.length);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	return <Fragment>{comment ? comment + " COMMENT" : "NO COMMENT"}</Fragment>;
}
