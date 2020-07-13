export default function save(props) {
	const { attributes } = props;
	const {
		title,
		heading_class,
		subtitle,
		h_class,
		h_id,
		heading_style,
		color,
		subtitle_color
	} = attributes;

	//valid id
	let id;
	if (h_id) {
		id = h_id;
	}

	//valid is set custom class
	let hClass;
	if (h_class !== undefined) {
		hClass = h_class;
	}

	//valid is set heading stile - default is heading-content
	let hStyle;
	if (heading_style) {
		hStyle = heading_style;
	} else {
		hStyle = "";
	}

	let headClass;
	switch (heading_class) {
		case "content_heading":
			headClass = `heading-content ${hClass} ${hStyle}`;
			break;
		case "heading":
			headClass = `heading-middle ${hClass} ${hStyle}`;
			break;
		case "style-3":
			headClass = `heading-left ${hClass} ${hStyle}`;
			break;
	}

	//valid is set color for title and subtitle - default is #000000
	let hColor;
	let subColor;
	if (color !== "") {
		hColor = `color: ${color}`;
	}
	if (subtitle_color !== "") {
		subColor = `color: ${subtitle_color}`;
	}

	//valid is set subtitle and add in main content
	let subtitleClass;
	if (subtitle !== "") {
		subtitleClass = (
			<em class="heading-subtitle" style={subColor}>
				{subtitle}
			</em>
		);
	}

	//valid heading style and get content in output variable
	let output;
	if (hStyle == "divider-modern") {
		output = (
			<div>
				<attributes.size class={headClass} id={id} style={hColor}>
					<span>
						{subtitleClass}
						{title}
					</span>
				</attributes.size>
			</div>
		);
	} else {
		output = (
			<div>
				<attributes.size class={headClass} id={id} style={hColor}>
					<span>
						{title}
						{subtitleClass}
					</span>
				</attributes.size>
			</div>
		);
	}
	return output;
}
