/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import { SelectControl, TextControl, PanelBody } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

/**
 * Block edit function
 */
export default function edit({ attributes, setAttributes }) {
	let type_class = "";
	let icon = "";
	switch (attributes.selectInfo) {
		case "info":
			type_class = " alert-info";
			icon = "bell-o";
			break;
		case "danger":
			type_class = " alert-danger";
			icon = "exclamation";
			break;
		case "warning":
			type_class = " alert-warning";
			icon = "info";
			break;
		case "success":
			type_class = " alert-success";
			icon = "check";
			break;
		case "useful":
			type_class = " alert-useful";
			icon = "lightbulb-o";
			break;
		case "normal":
			type_class = " alert-normal";
			icon = "hand-o-right";
			break;
		case "info-2":
			type_class = " alert-info-style-2";
			icon = "bell-o";
			break;
		case "danger-2":
			type_class = " alert-danger-style-2";
			icon = "exclamation";
			break;
		case "warning-2":
			type_class = " alert-warning-style-2";
			icon = "info";
			break;
		case "success-2":
			type_class = " alert-success-style-2";
			icon = "check";
			break;
		case "useful-2":
			type_class = " alert-useful-style-2";
			icon = "lightbulb-o";
			break;
		case "normal-2":
			type_class = " alert-normal-style-2";
			icon = "hand-o-right";
			break;
	}

	let displayFields = (
		<div className={"alert" + type_class}>
			<button
				type="button"
				className="close"
				data-dismiss="alert"
				aria-hidden="true"
			>
				<i className="fa fa-remove"></i>
			</button>
			<i className={"fa fa-" + icon}></i> {attributes.title}
		</div>
	);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody>
					<TextControl
						label={__("Text")}
						value={attributes.title}
						onChange={title => setAttributes({ title })}
					/>

					<SelectControl
						label={__("Icon")}
						value={attributes.selectInfo}
						options={[
							{ label: __("Info"), value: "info" },
							{ label: __("Danger"), value: "danger" },
							{ label: __("Warning"), value: "warning" },
							{ label: __("Success"), value: "success" },
							{ label: __("Useful"), value: "useful" },
							{ label: __("Normal"), value: "normal" },
							{ label: __("Info 2"), value: "info-2" },
							{ label: __("Danger 2"), value: "danger-2" },
							{ label: __("Warning 2"), value: "warning-2" },
							{ label: __("Success 2"), value: "success-2" },
							{ label: __("Useful 2"), value: "useful-2" },
							{ label: __("Normal 2"), value: "normal-2" }
						]}
						onChange={selectInfo => {
							setAttributes({ selectInfo });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			{displayFields}
		</Fragment>
	);
}
