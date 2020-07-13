import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import {
	FontSizePicker,
	PanelBody,
	TextControl,
	SelectControl
} from "@wordpress/components";

import Inspector from "./inspector";

export default function edit(props) {
	const { attributes, setAttributes } = props;

	let subtitleClass;
	if (attributes.subtitle !== "") {
		subtitleClass = (
			<em
				className="heading-subtitle"
				style={{
					color: attributes.subtitle_color ? attributes.subtitle_color : ""
				}}
			>
				{attributes.subtitle}
			</em>
		);
	}

	let headClass;
	switch (attributes.heading_class) {
		case "content_heading":
			headClass = `heading-content ${
				attributes.h_class ? attributes.h_class : ""
			} ${attributes.heading_style ? attributes.heading_style : ""}`;
			break;
		case "heading":
			headClass = `heading-middle ${
				attributes.h_class ? attributes.h_class : ""
			} ${attributes.heading_style ? attributes.heading_style : ""}`;
			break;
		case "style-3":
			headClass = `heading-left ${
				attributes.h_class ? attributes.h_class : ""
			} ${attributes.heading_style ? attributes.heading_style : ""}`;
			break;
		default:
			break;
	}

	let output;
	if (attributes.heading_style == "divider-modern") {
		output = (
			<div>
				<attributes.size
					className={headClass}
					id={attributes.h_id ? attributes.h_id : ""}
					style={{ color: attributes.color ? attributes.color : "" }}
				>
					<span>
						{subtitleClass}
						{attributes.title}
					</span>
				</attributes.size>
			</div>
		);
	} else {
		output = (
			<div>
				<attributes.size
					className={headClass}
					id={attributes.h_id ? attributes.h_id : ""}
					style={{ color: attributes.color ? attributes.color : "" }}
				>
					<span>
						{attributes.title}
						{subtitleClass}
					</span>
				</attributes.size>
			</div>
		);
	}

	console.log(attributes);
	return (
		<Fragment>
			<Inspector {...props} />
			{output}
		</Fragment>
	);
}
