import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl, SelectControl } from "@wordpress/components";

export default function inspector(props) {
	const { attributes, setAttributes } = props;
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Anps Heading Options" initialOpen={true}>
					<TextControl
						label={__("Title")}
						value={attributes.title}
						onChange={value => setAttributes({ title: value })}
					/>
					<TextControl
						label={__("Subtitle")}
						value={attributes.subtitle}
						onChange={value => setAttributes({ subtitle: value })}
					/>
					<SelectControl
						label={__("Size")}
						value={attributes.size}
						options={[
							{ label: __("H1"), value: "h1" },
							{ label: __("H2"), value: "h2" },
							{ label: __("H3"), value: "h3" },
							{ label: __("H4"), value: "h4" },
							{ label: __("H5"), value: "h5" }
						]}
						onChange={value => {
							setAttributes({ size: value });
						}}
					/>
					<SelectControl
						label={__("Heading Class")}
						value={attributes.heading_class}
						options={[
							{ label: __("Middle heading"), value: "heading" },
							{ label: __("Content heading"), value: "content_heading" },
							{ label: __("Left heading"), value: "style-3" }
						]}
						onChange={value => {
							setAttributes({ heading_class: value });
						}}
					/>
					<SelectControl
						label={__("Heading Style")}
						value={attributes.heading_style}
						options={[
							{ label: __("Style 1"), value: "style-1" },
							{ label: __("Style 2"), value: "divider-sm" },
							{ label: __("Style 3"), value: "divider-lg" },
							{ label: __("Style 4"), value: "divider-modern" }
						]}
						onChange={value => {
							setAttributes({ heading_style: value });
						}}
					/>
					<TextControl
						label={__("ID")}
						value={attributes.h_id}
						onChange={value => setAttributes({ h_id: value })}
					/>
					<TextControl
						label={__("Class")}
						value={attributes.h_class}
						onChange={value => setAttributes({ h_class: value })}
					/>
				</PanelBody>
				<PanelColorSettings
					title={__("Heading Colors", "anpsblocks")}
					initialOpen={false}
					colorSettings={[
						{
							value: attributes.color,
							onChange: value => {
								setAttributes({ color: value });
							},
							label: __("Color", "anpsblocks")
						},
						{
							value: attributes.subtitle_color,
							onChange: value => {
								setAttributes({ subtitle_color: value });
							},
							label: __("Subtitle Color", "anpsblocks")
						}
					]}
				></PanelColorSettings>
			</InspectorControls>
		</Fragment>
	);
}
