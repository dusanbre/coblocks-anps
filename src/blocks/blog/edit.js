import { Fragment } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

import Inspector from "./inspector";
import Display from "./display";

function edit(props) {
	return (
		<Fragment>
			<Inspector {...props} />
			<Display {...props} />
		</Fragment>
	);
}

export default edit;
