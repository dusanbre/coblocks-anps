import { Fragment } from "@wordpress/element";

import Inspector from "./inspector";

function edit(props) {
	return (
		<Fragment>
			<Inspector {...props} />
		</Fragment>
	);
}

export default edit;
