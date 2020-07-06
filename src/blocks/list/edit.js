const { __ } = wp.i18n;
const {
	Button,
	IconButton,
	PanelBody,
	TextareaControl,
	SelectControl
} = wp.components;
const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;

export default function edit({ attributes, setAttributes }) {
	//handlers for actions
	const handleAddValues = () => {
		const text = [...attributes.text];
		text.push({
			content: ""
		});
		setAttributes({ text });
	};

	const handleRemoveValues = index => {
		const text = [...attributes.text];
		text.splice(index, 1);
		setAttributes({ text });
	};

	const handleValuesChange = (content, index) => {
		const text = [...attributes.text];
		text[index].content = content;
		setAttributes({ text });
	};

	let listFields, listDisplay;

	//check items lenght and display new item
	if (attributes.text.length) {
		listFields = attributes.text.map((values, index) => {
			return (
				<div key={index} className="anps_list_inspector_controls">
					<TextareaControl
						className="anps_list_textarea_item"
						help="Enter text"
						value={attributes.text[index].content}
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

		listDisplay = attributes.text.map((values, index) => {
			return <li key={index}>{values.content}</li>;
		});
	}

	return (
		<Fragment>
			<InspectorControls key="1">
				<PanelBody title={__("Anps List Items")}>
					<SelectControl
						label={__("Pick Icon")}
						value={attributes.icon}
						options={[
							{ label: __("Default"), value: "default" },
							{ label: __("Circle arrow"), value: "circle-arrow" },
							{ label: __("Triangle"), value: "triangle" },
							{ label: __("Hand"), value: "hand" },
							{ label: __("Square"), value: "square" },
							{ label: __("Arrow"), value: "arrow" },
							{ label: __("Circle"), value: "circle" },
							{ label: __("Circle check"), value: "circle-check" }
						]}
						onChange={icon => {
							setAttributes({ icon });
						}}
					/>

					{listFields}
					<Button
						isDefault
						onClick={handleAddValues.bind(this)}
						className="anps_list_btn_add_item"
					>
						{__("Add Item")}
					</Button>
				</PanelBody>
			</InspectorControls>
			<div key="2" className="anps_list_editor_wrapper">
				<ul className={"list list-" + attributes.icon}>{listDisplay}</ul>
			</div>
		</Fragment>
	);
}
