import { Fragment } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl, SelectControl } from "@wordpress/components";

function inspector(props) {
	const { attributes, setAttributes } = props;

	const displayFields = (
		<InspectorControls>
			<PanelBody title={__("Recent Blog Options")} initialOpen={true}>
				<TextControl
					label={__("Title")}
					value={attributes.title}
					onChange={value => setAttributes({ title: value })}
					help={__("Recent blog title.")}
				/>
				<SelectControl
					label={__("Style")}
					value={attributes.style}
					options={[
						{ label: __("Default"), value: "default" },
						{ label: __("Minimal Light"), value: "minimal-light" },
						{ label: __("Minimal Dark"), value: "minimal-dark" }
					]}
					onChange={value => setAttributes({ style: value })}
				/>
				<TextControl
					label={__("Number of blog posts")}
					value={attributes.num_post}
					onChange={value => setAttributes({ num_post: value })}
					help={__(
						"Enter number of recent blog posts. If you want to display all posts, leave this field on -1."
					)}
				/>
				<SelectControl
					label={__("Number in row")}
					value={attributes.num_in_row}
					options={[
						{ label: __("3"), value: "3" },
						{ label: __("4"), value: "4" }
					]}
					onChange={value => setAttributes({ num_in_row: value })}
					help={__("Select number of items in row.")}
				/>
				<SelectControl
					label={__("Slider")}
					value={attributes.slider}
					options={[
						{ label: __("Enable"), value: "1" },
						{ label: __("Disable"), value: "0" }
					]}
					onChange={value => setAttributes({ slider: value })}
					help={__("Enable/disable slider.")}
				/>
				<TextControl
					label={__("Content length")}
					value={attributes.content_length}
					onChange={value => setAttributes({ content_length: value })}
					help={__("Content length (default 130).")}
				/>
				<TextControl
					label={__("Category id/s")}
					value={attributes.cat_ids}
					onChange={value => setAttributes({ cat_ids: value })}
					help={__("Enter category id/s. Example: 1,2,3")}
				/>
			</PanelBody>
		</InspectorControls>
	);
	console.log(attributes);
	return <Fragment>{displayFields}</Fragment>;
}

export default inspector;
