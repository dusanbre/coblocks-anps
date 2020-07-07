const { Button, PanelBody, TextControl, TextareaControl } = wp.components;
const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

export default function edit({ attributes, setAttributes }) {
	//handlers for actions
	const handleAddValues = () => {
		const text = [...attributes.text];
		text.push({
			year: "",
			title: "",
			content: ""
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
		text[index].content = content;
		setAttributes({ text });
	};
	const handleYearChange = (year, index) => {
		const text = [...attributes.text];
		text[index].year = year;
		setAttributes({ text });
	};
	const handleTitleChange = (title, index) => {
		const text = [...attributes.text];
		text[index].title = title;
		setAttributes({ text });
	};

	//store var's
	let listFields, listDisplay;

	//check items lenght and display new item
	if (attributes.text.length) {
		listFields = attributes.text.map((values, index) => {
			return (
				<PanelBody title={__("Anps Timeline Item")}>
					<div key={index} className="anps_timeline_inspector_controls">
						<TextControl
							label="Year"
							value={attributes.text[index].year}
							onChange={year => handleYearChange(year, index)}
						/>
						<TextControl
							label="Title"
							value={attributes.text[index].title}
							onChange={title => handleTitleChange(title, index)}
						/>
						<TextareaControl
							label="Content"
							value={attributes.text[index].content}
							onChange={content => handleContentChange(content, index)}
						/>
						<Button
							className="anps_timeline_remove_item"
							onClick={() => handleRemoveValues(index)}
						>
							{__("Delete Item")}
						</Button>
					</div>
				</PanelBody>
			);
		});

		listDisplay = attributes.text.map((values, index) => {
			return (
				<div className="timeline-item">
					<div className="timeline-year">{values.year}</div>
					<div className="timeline-content">
						<div className="timeline-title">{values.title}</div>
						<div className="timeline-text">{values.content}</div>
					</div>
				</div>
			);
		});
	}

	return (
		<Fragment>
			<InspectorControls key="1">
				<PanelBody title={__("Anps Timeline Block")}>
					{listFields}
					<Button
						isDefault
						onClick={handleAddValues.bind(this)}
						className="anps_timeline_btn_add_item"
					>
						{__("Add Item")}
					</Button>
				</PanelBody>
			</InspectorControls>
			<div className="timeline">{listDisplay}</div>
		</Fragment>
	);
}
