import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { useState, Fragment } from "@wordpress/element";

export default function media({ imageId }) {
	const [image, setImage] = useState();

	if (imageId && imageId !== 0) {
		apiFetch({
			path: addQueryArgs(`/wp/v2/media/${imageId}`)
		})
			.then(res => {
				setImage(res);
			})
			.catch(err => {
				console.log(err);
			});
	}
	return (
		<Fragment>{image ? <img src={image.source_url} alt="" /> : ""}</Fragment>
	);
}
