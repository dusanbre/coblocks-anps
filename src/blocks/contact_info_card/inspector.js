import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import {
	TextControl,
	TextareaControl,
	Button,
	PanelBody,
	SelectControl
} from "@wordpress/components";
import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";

import iconsData from "../../utils/icons/icons.json";

function inspector(props) {
	const { attributes, setAttributes } = props;
	const handleAddValues = () => {
		const text = [...attributes.text];
		text.push({
			icon: "",
			cardTitle: "",
			cardText: "",
			titleColor: "#a3baca",
			descColor: "#fff",
			backgroundColor: "#215070",
			iconColor: "#fff",
			iconBackColor: "#3498db"
		});
		setAttributes({ text });
	};

	const handleRemoveValues = index => {
		const text = [...attributes.text];
		text.splice(index, 1);
		setAttributes({ text });
	};

	const handleContentChange = (content, index) => {
		const text = [...attributes.text];
		text[index].cardText = content;
		setAttributes({ text });
	};
	const handleTitleChange = (title, index) => {
		const text = [...attributes.text];
		text[index].cardTitle = title;
		setAttributes({ text });
	};

	const handleIconChange = (icon, index) => {
		const text = [...attributes.text];
		text[index].icon = icon.target.value;
		setAttributes({ text });
	};

	//store var's
	let listFields;
	console.log(attributes);

	//check items lenght and display new item
	if (attributes.text.length) {
		listFields = attributes.text.map((values, index) => {
			return (
				<Fragment>
					<PanelBody
						title={__("Contact Info Card Item " + index)}
						initialOpen={false}
					>
						<div
							key={index}
							className="anps_contact_info_card_inspector_controls"
						>
							<label style={{ marginBottom: "-5px", marginTop: "10px" }}>
								Pick Icon
							</label>
							<select
								style={{ margin: "15px 0", width: "100%" }}
								value={[attributes.text[index].icon]}
								onChange={icon => handleIconChange(icon, index)}
							>
								{iconsData.map(icon => {
									return <option value={"fa " + icon.c}>{icon.l}</option>;
								})}
							</select>
							<TextControl
								label="Title"
								value={attributes.text[index].cardTitle}
								onChange={title => handleTitleChange(title, index)}
							/>
							<TextareaControl
								label="Text"
								value={attributes.text[index].cardText}
								onChange={content => handleContentChange(content, index)}
							/>

							{/* Color picker component with props passed,defined inside component how to use */}
							<div className="anps__contact-info-card-colors-inspector"></div>
							<PanelColorSettings
								title={__("Card Colors", "anpsblocks")}
								initialOpen={false}
								colorSettings={[
									{
										value: attributes.titleColor,
										onChange: nextColor => {
											const text = [...attributes.text];
											text[index].titleColor = nextColor;
											setAttributes({ text });
										},
										label: __("Title Color", "anpsblocks")
									},
									{
										value: attributes.backgroundColor,
										onChange: nextColor => {
											const text = [...attributes.text];
											text[index].backgroundColor = nextColor;
											setAttributes({ text });
										},
										label: __("Background Color", "anpsblocks")
									},
									{
										value: attributes.descColor,
										onChange: nextColor => {
											const text = [...attributes.text];
											text[index].descColor = nextColor;
											setAttributes({ text });
										},
										label: __("Description Color", "anpsblocks")
									},
									{
										value: attributes.iconColor,
										onChange: nextColor => {
											const text = [...attributes.text];
											text[index].iconColor = nextColor;
											setAttributes({ text });
										},
										label: __("Icon Color", "anpsblocks")
									},
									{
										value: attributes.iconBackColor,
										onChange: nextColor => {
											const text = [...attributes.text];
											text[index].iconBackColor = nextColor;
											setAttributes({ text });
										},
										label: __("Icon Background Color", "anpsblocks")
									}
								]}
							></PanelColorSettings>
							{/* button for removing contant info card item */}
							<Button
								className="anps__repeater-remove-item"
								onClick={() => handleRemoveValues(index)}
							>
								{__("Delete Item")}
							</Button>
						</div>
					</PanelBody>
				</Fragment>
			);
		});
	}
	return (
		<InspectorControls key="1">
			<PanelBody title={__("Anps Contact Info Card Blocks")}>
				<SelectControl
					label={__("Number of Rows")}
					value={attributes.num_row}
					options={[
						{ label: __("3"), value: "col-md-4" },
						{
							label: __("2"),
							value: "col-md-6"
						}
					]}
					onChange={num_row => {
						setAttributes({ num_row });
					}}
				/>
				{listFields}
				<Button
					isDefault
					onClick={handleAddValues.bind(this)}
					className="anps__repeater-btn-add-item"
				>
					{__("Add Item")}
				</Button>
			</PanelBody>
		</InspectorControls>
	);
}
export default inspector;
