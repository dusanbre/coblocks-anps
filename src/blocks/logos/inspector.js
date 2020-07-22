import { __ } from "@wordpress/i18n";
import {
	Button,
	IconButton,
	PanelBody,
	TextControl,
	SelectControl
} from "@wordpress/components";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from "@wordpress/editor";
import { Fragment } from "@wordpress/element";

export default function inspector(props) {
	const { attributes, setAttributes } = props;

	const handleAddValues = () => {
		const logos = [...attributes.logos];
		logos.push({
			media: "",
			url: "",
			alt: ""
		});
		setAttributes({ logos });
	};

	const handleMediaUpload = (media, index) => {
		const logos = [...attributes.logos];
		logos[index].media = media;
		setAttributes({ logos });
	};

	const handleUrl = (url, index) => {
		const logos = [...attributes.logos];
		logos[index].url = url;
		setAttributes({ logos });
	};

	const handleRemoveValues = index => {
		const logos = [...attributes.logos];
		logos.splice(index, 1);
		setAttributes({ logos });
	};

	const handleAlt = (alt, index) => {
		const logos = [...attributes.logos];
		logos[index].alt = alt;
		setAttributes({ logos });
	};

	let logosFields;
	if (attributes.logos.length) {
		logosFields = attributes.logos.map((values, index) => {
			return (
				<PanelBody title={"Logos Item " + index} initialOpen={false}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={media => handleMediaUpload(media, index)}
							allowedTypes={["image"]}
							value={attributes.image}
							render={({ open }) => (
								<Button onClick={open} className="anps__button-logos-img">
									{values.media ? (
										<img src={values.media.sizes.full.url} />
									) : (
										<span>Add Logo</span>
									)}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					<TextControl
						label={__("Url")}
						onChange={url => handleUrl(url, index)}
					/>
					<TextControl
						label={__("Alt")}
						onChange={alt => handleAlt(alt, index)}
					/>
					<IconButton
						className="anps_list_remove_item"
						icon="no-alt"
						label="Delete values"
						onClick={() => handleRemoveValues(index)}
					/>
				</PanelBody>
			);
		});
	}
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__("Anps Logos Settings")} initialOpen={true}>
					<TextControl
						label={__("Logos in row")}
						help={__("Logos in one row")}
						onChange={value => setAttributes({ inRow: value })}
					/>
					<SelectControl
						label={__("Style")}
						help={__("Select logos style")}
						value={attributes.style}
						options={[
							{ label: __("Style 1"), value: "style-1" },
							{ label: __("Style 2"), value: "style-2" },
							{ label: __("Style 3"), value: "style-3" }
						]}
						onChange={value => setAttributes({ style: value })}
					/>
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
