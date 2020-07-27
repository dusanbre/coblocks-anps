import { Fragment } from "@wordpress/element";

import Inspector from "./inspector";

export default function edit(props) {
	return (
		<Fragment>
			<Inspector {...props} />
		</Fragment>
	);
}
