import React from "react";

export default function save({ attributes }) {
	let type_class = "";
	let icon = "";
	switch (attributes.selectInfo) {
		case "info":
			type_class = " alert-info";
			icon = "bell-o";
			break;
		case "danger":
			type_class = " alert-danger";
			icon = "exclamation";
			break;
		case "warning":
			type_class = " alert-warning";
			icon = "info";
			break;
		case "success":
			type_class = " alert-success";
			icon = "check";
			break;
		case "useful":
			type_class = " alert-useful";
			icon = "lightbulb-o";
			break;
		case "normal":
			type_class = " alert-normal";
			icon = "hand-o-right";
			break;
		case "info-2":
			type_class = " alert-info-style-2";
			icon = "bell-o";
			break;
		case "danger-2":
			type_class = " alert-danger-style-2";
			icon = "exclamation";
			break;
		case "warning-2":
			type_class = " alert-warning-style-2";
			icon = "info";
			break;
		case "success-2":
			type_class = " alert-success-style-2";
			icon = "check";
			break;
		case "useful-2":
			type_class = " alert-useful-style-2";
			icon = "lightbulb-o";
			break;
		case "normal-2":
			type_class = " alert-normal-style-2";
			icon = "hand-o-right";
			break;
	}

	return (
		<div className={"alert" + type_class}>
			<button
				type="button"
				className="close"
				data-dismiss="alert"
				aria-hidden="true"
			>
				<i className="fa fa-remove"></i>
			</button>
			<i className={"fa fa-" + icon}></i> {attributes.title}
		</div>
	);
}
