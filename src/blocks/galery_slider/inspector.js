import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from "@wordpress/editor";

import { PanelBody, Button } from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function inspector(props) {
	const { attributes, setAttributes } = props;
	return (
		<InspectorControls>
			<PanelBody title={__("Galery Slider Options")} initialOpen={true}>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={media => setAttributes({ media })}
						allowedTypes={["image"]}
						multiple={true}
						value={attributes.media}
						render={({ open }) => (
							<Button
								onClick={open}
								isPrimary
								className="anps__button-galery-img"
							>
								{attributes.media.length != 0
									? `Selected ${attributes.media.length} Images`
									: "No Images Selected"}
							</Button>
						)}
					/>
				</MediaUploadCheck>
			</PanelBody>
		</InspectorControls>
	);
}
