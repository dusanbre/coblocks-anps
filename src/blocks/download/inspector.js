import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import { TextControl, SelectControl, PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import iconData from "../../utils/icons/icons.json";

function inspector(props) {
	const { attributes, setAttributes } = props;

	const icons = iconData.map(icon => {
		return { label: icon.l, value: icon.c };
	});

	return (
		<InspectorControls>
			<PanelBody title={__("Download Options")} initialOpen={true}>
				<TextControl
					label={__("Text")}
					value={attributes.content}
					onChange={content => setAttributes({ content })}
				/>
				<SelectControl
					label={__("Content Icon")}
					value={attributes.iconC}
					options={icons}
					onChange={value => setAttributes({ iconC: value })}
				/>
				<TextControl
					label={__("Url")}
					value={attributes.url}
					onChange={url => setAttributes({ url })}
				/>
				<SelectControl
					label={__("Target")}
					value={attributes.target}
					options={[
						{ label: __("Self"), value: "_self" },
						{ label: __("Blank"), value: "_blank" },
						{ label: __("Parent"), value: "_parent" },
						{ label: __("Top"), value: "_top" }
					]}
					onChange={target => setAttributes({ target })}
				/>
				<TextControl
					label={__("Download Text")}
					value={attributes.downloadText}
					onChange={value => setAttributes({ downloadText: value })}
				/>
				<SelectControl
					label={__("Icon")}
					value={attributes.iconD}
					onChange={iconD => setAttributes({ iconD })}
					options={icons}
				/>
			</PanelBody>
			<PanelColorSettings
				colorSettings={[
					{
						value: attributes.colorText,
						onChange: nextColor => setAttributes({ colorText: nextColor }),
						label: __("Text Color", "anpsblocks")
					}
				]}
				title={__("Download Colors")}
				initialOpen={false}
			></PanelColorSettings>
		</InspectorControls>
	);
}

export default inspector;
