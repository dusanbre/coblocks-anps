import { __ } from "@wordpress/i18n";
import {
	Button,
	IconButton,
	PanelBody,
	TextControl,
	SelectControl,
	TextareaControl,
	CheckboxControl
} from "@wordpress/components";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from "@wordpress/editor";
import { Fragment } from "@wordpress/element";

function inspector(props) {
	const { attributes, setAttributes } = props;

	const handleAddValues = () => {
		const testimonial = [...attributes.testimonial];
		testimonial.push({
			text: "",
			user: "",
			job: "",
			media: "",
			imageUrl: ""
		});
		setAttributes({ testimonial });
	};

	const handleMediaUpload = (media, index) => {
		const testimonial = [...attributes.testimonial];
		testimonial[index].media = media;
		setAttributes({ testimonial });
	};

	const handleText = (text, index) => {
		const testimonial = [...attributes.testimonial];
		testimonial[index].text = text;
		setAttributes({ testimonial });
	};

	const handleRemoveValues = index => {
		const testimonial = [...attributes.testimonial];
		testimonial.splice(index, 1);
		setAttributes({ testimonial });
	};

	const handleUser = (user, index) => {
		const testimonial = [...attributes.testimonial];
		testimonial[index].user = user;
		setAttributes({ testimonial });
	};

	const handleJob = (job, index) => {
		const testimonial = [...attributes.testimonial];
		testimonial[index].job = job;
		setAttributes({ testimonial });
	};

	const handleImageUrl = (imageUrl, index) => {
		const testimonial = [...attributes.testimonial];
		testimonial[index].imageUrl = imageUrl;
		setAttributes({ testimonial });
	};

	let testimonialFields;
	if (attributes.testimonial.length) {
		testimonialFields = attributes.testimonial.map((values, index) => {
			return (
				<PanelBody title={"testimonial Item " + index} initialOpen={false}>
					<TextareaControl
						label={__("Testimonial text")}
						onChange={text => handleText(text, index)}
					/>
					<TextControl
						label={__("User Name")}
						onChange={user => handleUser(user, index)}
					/>
					<TextControl
						label={__("Job Position")}
						onChange={job => handleJob(job, index)}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={media => handleMediaUpload(media, index)}
							allowedTypes={["image"]}
							value={attributes.image}
							render={({ open }) => (
								<Button onClick={open} className="anps__button-testimonial-img">
									{values.media ? (
										<img src={values.media.sizes.full.url} />
									) : (
										<span>User Image</span>
									)}
								</Button>
							)}
						/>
					</MediaUploadCheck>

					<TextControl
						label={__("User image url")}
						onChange={imageUrl => handleImageUrl(imageUrl, index)}
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
				<PanelBody title={__("Anps testimonial Settings")} initialOpen={true}>
					<TextControl
						label={__("TItle")}
						help={__("Enter the title")}
						onChange={value => setAttributes({ title: value })}
						value={attributes.title}
					/>
					<SelectControl
						label={__("Style")}
						help={__("Select testimonial style")}
						value={attributes.style}
						options={[
							{ label: __("Style 1"), value: "style-1" },
							{ label: __("Style 2"), value: "style-2" },
							{ label: __("Style 3"), value: "style-3" }
						]}
						onChange={value => setAttributes({ style: value })}
					/>
					<CheckboxControl
						heading="Random Order"
						label={__("Yes")}
						help={__(
							"Display testimonials in random order when shown in a corusel"
						)}
						onChange={value => setAttributes({ random: value })}
						checked={attributes.random}
					/>
					<CheckboxControl
						heading="Autoplay"
						label={__("Yes")}
						onChange={value => setAttributes({ autoplay: value })}
						checked={attributes.autoplay}
					/>
					<TextControl
						label={__("Autoplay timeout")}
						onChange={value => setAttributes({ autoplayTimeout: value })}
						value={attributes.autoplayTimeout}
					/>
					{testimonialFields}
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

export default inspector;
