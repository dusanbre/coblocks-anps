import { Fragment } from "@wordpress/element";
import Inspector from "./inspector";
function edit(props) {
	const { attributes } = props;
	//handlers for actions
	let listDisplay;
	//get content to display in editor in var listDisplay
	listDisplay = attributes.text.map((values, index) => {
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
	//return all content for editor
	return (
		<Fragment>
			<Inspector {...props} />
			<div className="contact-card">
				<div className="row">{listDisplay}</div>
			</div>
		</Fragment>
	);
}

export default edit;
