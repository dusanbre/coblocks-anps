import { __ } from "@wordpress/i18n";
import {
	Button,
	IconButton,
	PanelBody,
	TextareaControl,
	SelectControl
} from "@wordpress/components";
import { InspectorControls } from "@wordpress/editor";
import { Fragment } from "@wordpress/element";

export default function inspector(props) {
	const { attributes, setAttributes } = props;

	const handleAddValues = () => {
		const logos = [...attributes.logos];
		logos.push({
			content: ""
		});
		setAttributes({ logos });
	};

	const handleValuesChange = (content, index) => {
		const logos = [...attributes.logos];
		logos[index].content = content;
		setAttributes({ logos });
	};

	let logosFields;
	console.log(attributes);
	if (attributes.logos.length) {
		logosFields = attributes.logos.map((values, index) => {
			return (
				<div key={index} className="anps_list_inspector_controls">
					<TextControl
						className="anps_list_textarea_item"
						help="Enter text"
						value={attributes.logos[index].content}
						onChange={content => handleValuesChange(content, index)}
					/>
					<IconButton
						className="anps_list_remove_item"
						icon="no-alt"
						label="Delete values"
						onClick={() => handleRemoveValues(index)}
					/>
				</div>
			);
		});
	}
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__("Anps Logos Settings")} initialOpen={true}>
					{logosFields}
					<Button
						isDefault
						onClick={handleAddValues.bind(this)}
						className="anps_list_btn_add_item"
					>
						{__("Add Item")}
					</Button>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
