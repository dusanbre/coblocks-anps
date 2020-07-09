import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { useState, Fragment } from "@wordpress/element";

export default function author({ authorId }) {
	const [author, setAuthor] = useState();
	if (authorId && authorId !== 0) {
		apiFetch({
			path: addQueryArgs(`/wp/v2/users/${authorId}`)
		})
			.then(res => {
				setAuthor(res);
			})
			.catch(err => {
				console.log(err);
			});
	}
	return (
		<Fragment>
			{author ? <span className="fn">{author.name}</span> : "Loading..."}
		</Fragment>
	);
}
