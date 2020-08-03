import { __ } from "@wordpress/i18n";
import {
	Button,
	IconButton,
	PanelBody,
	TextControl,
	SelectControl,
	CheckboxControl,
	TextareaControl
} from "@wordpress/components";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from "@wordpress/editor";
import { Fragment } from "@wordpress/element";
import { parseWithAttributeSchema } from "@wordpress/blocks";

import iconData from "../../utils/icons/icons.json";

export default function inspector(props) {
	const { attributes, setAttributes } = props;

	const icons = iconData.map(icon => {
		return { label: icon.l, value: icon.c };
	});

	return (
		<InspectorControls>
			<PanelBody title={__("Featured Content Options")} initialOpen={true}>
				<TextControl
					label={__("Title")}
					value={attributes.title}
					onChange={title => setAttributes({ title })}
				/>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={imageU => setAttributes({ imageU })}
						allowedTypes={["image"]}
						value={attributes.imageU}
						render={({ open }) => (
							<Button
								onClick={open}
								isPrimary
								className="anps__button-galery-img"
							>
								{attributes.imageU
									? `Selected Image ID: ${attributes.imageU.id}`
									: "No Images Selected"}
							</Button>
						)}
					/>
				</MediaUploadCheck>
				<TextControl
					label={__("Button Text")}
					value={attributes.buttonText}
					onChange={buttonText => setAttributes({ buttonText })}
				/>
				<TextControl
					label={__("Video")}
					value={attributes.video}
					onChange={video => setAttributes({ video })}
					help={__(
						"Enter youtube or vimeo video url. Example: https://vimeo.com/146064760"
					)}
				/>
				<TextareaControl
					label={__("Content")}
					value={attributes.content}
					onChange={content => setAttributes({ content })}
				/>
				<TextControl
					label={__("Link")}
					value={attributes.link}
					onChange={link => setAttributes({ link })}
				/>
				<SelectControl
					label={__("Link Target")}
					value={attributes.linkTarget}
					options={[
						{ label: __("Self"), value: "_self" },
						{ label: __("Blank"), value: "_blank" },
						{ label: __("Parent"), value: "_parent" },
						{ label: __("Top"), value: "_top" }
					]}
					onChange={linkTarget => setAttributes({ linkTarget })}
				/>
				<SelectControl
					label={__("Icon")}
					value={attributes.icon}
					options={icons}
					onChange={icon => setAttributes({ icon })}
				/>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={iconCustom => setAttributes({ iconCustom })}
						allowedTypes={["image"]}
						value={attributes.iconCustom}
						render={({ open }) => (
							<Button
								onClick={open}
								isPrimary
								className="anps__button-galery-img"
							>
								{attributes.iconCustom
									? `Selected Image ID: ${attributes.iconCustom.id}`
									: "Icon Custom"}
							</Button>
						)}
					/>
				</MediaUploadCheck>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={iconCustomHover => setAttributes({ iconCustomHover })}
						allowedTypes={["image"]}
						value={attributes.iconCustomHover}
						render={({ open }) => (
							<Button
								onClick={open}
								isPrimary
								className="anps__button-galery-img"
							>
								{attributes.iconCustomHover
									? `Selected Image ID: ${attributes.iconCustomHover.id}`
									: "Icon Custom Hover"}
							</Button>
						)}
					/>
				</MediaUploadCheck>
				<CheckboxControl
					label={__("Lightbox")}
					help={__("Open image or video in fullscreen lightbox")}
					checked={attributes.lightbox}
					onChange={lightbox => setAttributes({ lightbox })}
				/>
				<CheckboxControl
					label={__("Exposed")}
					checked={attributes.exposed}
					onChange={exposed => setAttributes({ exposed })}
				/>
				<CheckboxControl
					label={__("position image above? (use below slider)")}
					checked={attributes.absoluteImg}
					onChange={absoluteImg => setAttributes({ absoluteImg })}
				/>
				<SelectControl
					label={__("Style")}
					value={attributes.style}
					options={[
						{ label: __("Default"), value: "" },
						{ label: __("Simple"), value: "simple-style" }
					]}
					onChange={style => setAttributes({ style })}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
