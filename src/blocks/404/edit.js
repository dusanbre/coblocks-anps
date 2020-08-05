import {
	InspectorControls,
	MediaUploadCheck,
	MediaUpload
} from "@wordpress/block-editor";
import { TextControl, PanelBody, Button } from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function edit(props) {
	const { attributes, setAttributes } = props;

	const inspector = (
		<InspectorControls>
			<PanelBody title={__("404 Options")} initialOpen={true}>
				<TextControl
					label={__("Title")}
					value={attributes.title}
					onChange={title => setAttributes({ title })}
				/>
				<TextControl
					label={__("Subtitle")}
					value={attributes.subtitle}
					onChange={subtitle => setAttributes({ subtitle })}
				/>

				<MediaUploadCheck>
					<MediaUpload
						onSelect={image => setAttributes({ image })}
						allowedTypes={["image"]}
						value={attributes.image}
						render={({ open }) => (
							<Button
								onClick={open}
								isPrimary
								className="anps__button-galery-img"
							>
								{attributes.image
									? `Selected Image ID: ${attributes.image.id}`
									: "No Images Selected"}
							</Button>
						)}
					/>
				</MediaUploadCheck>
			</PanelBody>
		</InspectorControls>
	);
	return (
		<Fragment>
			{inspector}
			<div className="text-center">
				<h2 className="title fs30">{attributes.title}</h2>
				<br />
				<span>{attributes.subtitle}</span>
				<br />
				{attributes.image ? (
					<img className="error404" src={attributes.image.sizes.full.url} />
				) : (
					""
				)}
			</div>
		</Fragment>
	);
}
