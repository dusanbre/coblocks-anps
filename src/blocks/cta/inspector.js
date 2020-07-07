import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import { PanelBody, TextControl, SelectControl } from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function inspector({ attributes, setAttributes }) {
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__("Call to Action Options")} initialOpen={true}>
					<TextControl
						label={__("Text")}
						value={attributes.text}
						onChange={value => setAttributes({ text: value })}
						help="Add some text to your call to action element"
					/>
					<TextControl
						label={__("Button Text")}
						value={attributes.buttonText}
						onChange={value => setAttributes({ buttonText: value })}
						help="Add some text to button"
					/>
					<TextControl
						label={__("URL")}
						value={attributes.url}
						onChange={value => setAttributes({ url: value })}
						help="Add url link to button for call to action"
					/>
					<SelectControl
						label={__("Button Type")}
						value={attributes.buttonType}
						onChange={value => setAttributes({ buttonType: value })}
						options={[
							{ label: __("Normal"), value: "btn-normal" },
							{ label: __("Light"), value: "btn-light" },
							{ label: __("Dark"), value: "btn-dark" }
						]}
					/>
					<SelectControl
						label={__("Target")}
						value={attributes.target}
						onChange={value => setAttributes({ target: value })}
						options={[
							{ label: __("Self"), value: "_self" },
							{ label: __("Blank"), value: "_blank" }
						]}
					/>
				</PanelBody>
				<PanelColorSettings
					title={__("Colors Options", "anpsblocks")}
					initialOpen={false}
					colorSettings={[
						{
							value: attributes.textColor,
							onChange: nextColor => {
								setAttributes({ textColor: nextColor });
							},
							label: __("Text Color", "anpsblocks")
						}
					]}
				></PanelColorSettings>
			</InspectorControls>
		</Fragment>
	);
}
