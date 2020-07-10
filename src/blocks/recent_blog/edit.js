import { Fragment } from "@wordpress/element";

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
