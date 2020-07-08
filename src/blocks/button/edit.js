import iconsData from "../../utils/icons/icons.json";
import { TextControl, PanelBody, SelectControl } from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";

export default function edit({ attributes, setAttributes }) {
	//icon class
	let iconClass;
	if (attributes.icon) {
		iconClass = <i className={attributes.icon}></i>;
	}

	const iconsList = iconsData.map(icon => {
		return { label: icon.l, value: "fa " + icon.c };
	});
	
	let styleCss;
	if (!attributes.link) {
		styleCss = (
			<button
				className={"btn " + attributes.style + " " + attributes.size}
				style={{
					color:
						attributes.hoverStatus == true
							? attributes.hoverColor
							: attributes.color,
					backgroundColor:
						attributes.hoverStatus == true
							? attributes.hoverBackground
							: attributes.background
				}}
				onMouseEnter={() => setAttributes({ hoverStatus: true })}
				onMouseLeave={() => setAttributes({ hoverStatus: false })}
			>
				{iconClass}
				{attributes.text}
			</button>
		);
	} else {
		styleCss = (
			<a
				href={attributes.link}
				target={attributes.target}
				className={"btn " + attributes.style + " " + attributes.size}
				style={{
					color:
						attributes.hoverStatus == true
							? attributes.hoverColor
							: attributes.color,
					backgroundColor:
						attributes.hoverStatus == true
							? attributes.hoverBackground
							: attributes.background
				}}
				onMouseEnter={() => setAttributes({ hoverStatus: true })}
				onMouseLeave={() => setAttributes({ hoverStatus: false })}
			>
				{iconClass}
				{attributes.text}
			</a>
		);
	}
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Button Content">
					<TextControl
						label={__("Button Text")}
						value={attributes.text}
						onChange={text => setAttributes({ text })}
					/>
					<TextControl
						label={__("Button Link")}
						value={attributes.link}
						onChange={link => setAttributes({ link })}
					/>
					<TextControl
						label={__("Button Target")}
						value={attributes.target}
						onChange={target => setAttributes({ target })}
					/>
					<SelectControl
						label={__("Button Size")}
						value={attributes.size}
						options={[
							{ label: __("Small"), value: "btn-sm" },
							{ label: __("Medium"), value: "btn-md" },
							{ label: __("Large"), value: "btn-lg" }
						]}
						onChange={size => {
							setAttributes({ size });
						}}
					/>
					<SelectControl
						label={__("Button Style")}
						value={attributes.style}
						options={[
							{ label: __("Normal button"), value: "btn-normal" },
							{
								label: __("Button with gradient"),
								value: "btn-gradient btn-shadow"
							},
							{ label: __("Dark button"), value: "btn-dark btn-shadow" },
							{ label: __("Light button"), value: "btn-light" },
							{ label: __("Minimal button"), value: "btn-minimal" }
						]}
						onChange={style => {
							setAttributes({ style });
						}}
					/>
					<SelectControl
						label={__("Icon Picker")}
						value={attributes.icon}
						options={iconsList}
						onChange={value => {
							setAttributes({ icon: value });
						}}
					/>
				</PanelBody>
				<PanelColorSettings
					title={__("Button Colors", "anpsblocks")}
					initialOpen={false}
					colorSettings={[
						{
							value: attributes.color,
							onChange: nextColor => {
								setAttributes({ color: nextColor });
							},
							label: __("Color", "anpsblocks")
						},
						{
							value: attributes.background,
							onChange: nextBackground => {
								setAttributes({ background: nextBackground });
							},
							label: __("Background", "anpsblocks")
						},
						{
							value: attributes.hoverColor,
							onChange: nextHoverColor => {
								setAttributes({ hoverColor: nextHoverColor });
							},
							label: __("Hover Color", "anpsblocks")
						},
						{
							value: attributes.hoverBackground,
							onChange: nextHoverBackground => {
								setAttributes({ hoverBackground: nextHoverBackground });
							},
							label: __("Hover Background", "anpsblocks")
						}
					]}
				></PanelColorSettings>
			</InspectorControls>
			<div>{styleCss}</div>
		</Fragment>
	);
}
