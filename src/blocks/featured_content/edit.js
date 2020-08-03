import Inspector from "./inspector";
import { Fragment } from "@wordpress/element";

export default function edit(props) {
	console.log(props.attributes);

	return (
		<Fragment>
			<Inspector {...props} />
		</Fragment>
	);
}
