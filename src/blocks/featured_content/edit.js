import Inspector from "./inspector";
import { Fragment } from "@wordpress/element";

export default function edit(props) {
	console.log(props.attributes);

	const { attributes } = props;

	let icon, hasIcon, mediaClass;
	if (attributes.icon) {
		icon = <i className={`fa ${attributes.icon}`}></i>;
		hasIcon = " featured-has-icon";
	}

	if (attributes.video != "" && attributes.lightbox != false) {
	}

	return (
		<Fragment>
			<Inspector {...props} />
		</Fragment>
	);
}
