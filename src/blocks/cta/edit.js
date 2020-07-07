import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Inspector from "./inspector";
export default function edit(props) {
	const {
		textColor,
		text,
		url,
		target,
		buttonType,
		buttonText
	} = props.attributes;
	return (
		<Fragment>
			<Inspector {...props} />
			<div className="anps_cta">
				<div className="cta-content font1" style={{ color: textColor }}>
					{text}
				</div>
				{url ? (
					<a
						href={url}
						target={target}
						className={"btn btn-lg " + buttonType}
						rel="noopener noreferrer"
					>
						{buttonText}
					</a>
				) : (
					""
				)}
			</div>
		</Fragment>
	);
}
