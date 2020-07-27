import { Fragment } from "@wordpress/element";

import Inspector from "./inspector";
import { FetchPortfolio } from "./fetchApi";

export default function edit(props) {
	const { attributes } = props;

	const get = FetchPortfolio(attributes);

	console.log(get);
	return (
		<Fragment>
			<Inspector {...props} />
		</Fragment>
	);
}
