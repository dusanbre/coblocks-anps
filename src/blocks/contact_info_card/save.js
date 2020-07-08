function save(props) {
	const { attributes } = props;
	//store content in listFields var
	const listFields = attributes.text.map((values, index) => {
		return (
			<div key={index} className={attributes.num_row}>
				<div
					class="card"
					style={{
						backgroundColor: values.backgroundColor,
						color: values.iconBackColor
					}}
				>
					<span className="icon">
						<i className={values.icon} style={{ color: values.iconColor }}></i>
					</span>
					<div className="content-wrap">
						<span className="item-title" style={{ color: values.titleColor }}>
							{values.cardTitle}
						</span>
						<div className="text font1" style={{ color: values.descColor }}>
							{values.cardText}
						</div>
					</div>
				</div>
			</div>
		);
	});

	//check supports for aligments
	let rowClass;
	let rowBackground;
	if (attributes.align === "full") {
		rowClass = "row anps__row-full";
	} else if (attributes.align === "wide") {
		rowClass = "row anps_row-wide";
		rowBackground = <div className="anps__row-full-width"></div>;
	} else {
		rowClass = "row";
	}
	//return all content on frontend
	return (
		<div className="contact-card">
			<div className={rowClass}>
				{rowBackground}
				{listFields}
			</div>
		</div>
	);
}

export default save;
