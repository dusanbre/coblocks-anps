import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	PanelBody,
	TextControl,
	SelectControl,
	TextareaControl,
	Button
} from "@wordpress/components";

import iconsData from "../../utils/icons/icons.json";

export default function inspector(props) {
	const { attributes, setAttributes } = props;

	const options = iconsData.map(icon => {
		return { label: icon.l, value: icon.c };
	});
	console.log(attributes);
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Anps Icon Options" initialOpen={true}>
					<TextControl
						label={__("Title")}
						value={attributes.title}
						onChange={value => setAttributes({ title: value })}
					/>
					<TextareaControl
						label={__("Content")}
						value={attributes.content}
						onChange={value => setAttributes({ content: value })}
					/>
					<TextControl
						label={__("Url")}
						value={attributes.url}
						onChange={value => setAttributes({ url: value })}
					/>
					<TextControl
						label={__("Target")}
						value={attributes.target}
						onChange={value => setAttributes({ target: value })}
					/>
					<SelectControl
						label={__("Icon Picker")}
						value={attributes.icon}
						options={options}
						onChange={value => {
							setAttributes({ icon: value });
						}}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={media => setAttributes({ image: media })}
							allowedTypes={["image"]}
							value={attributes.image}
							render={({ open }) => (
								<Button style={{ marginBottom: 15 }} isPrimary onClick={open}>
									Open Media Library
								</Button>
							)}
						/>
					</MediaUploadCheck>
					<SelectControl
						label={__("Icon Position")}
						value={attributes.position}
						options={[
							{ label: "Left", value: "icon-left" },
							{ label: "Right", value: "icon-right" },
							{ label: "Center", value: "icon-center" }
						]}
						onChange={value => {
							setAttributes({ position: value });
						}}
					/>
					<TextControl
						label={__("Icon Size")}
						value={attributes.iconSize}
						onChange={value => setAttributes({ iconSize: value })}
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
