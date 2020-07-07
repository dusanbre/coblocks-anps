import iconsData from "../../utils/icons/icons.json";
import {
	TextControl,
	PanelBody,
	SelectControl,
	Dropdown,
	Button,
	ColorPicker
} from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";

export default function edit({ attributes, setAttributes }) {
	function iconHandler(e) {
		setAttributes({
			icon: e.target.value
		});
	}

	let iconClass;
	if (attributes.icon) {
		iconClass = <i className={attributes.icon}></i>;
	}

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
					color: attributes.color,
					backgroundColor: attributes.background
				}}
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
					<Dropdown
						position="bottom right"
						renderToggle={({ isOpen, onToggle }) => (
							<Button isPrimary onClick={onToggle} aria-expanded={isOpen}>
								Select Icon
							</Button>
						)}
						renderContent={() => (
							<select value={attributes.icon} onChange={iconHandler}>
								{iconsData.map(icon => {
									return <option value={"fa " + icon.c}>{icon.l}</option>;
								})}
							</select>
						)}
					/>
				</PanelBody>
				<PanelBody
					title="Button Colors"
					initialOpen={false}
					className="anps_colors_panel_inspector"
				>
					<Dropdown
						position="bottom right"
						renderToggle={({ isOpen, onToggle }) => (
							<Button
								isPrimary
								onClick={onToggle}
								aria-expanded={isOpen}
								style={{ backgroundColor: attributes.color }}
							>
								Text Color
							</Button>
						)}
						renderContent={() => (
							<ColorPicker
								color={attributes.color}
								onChangeComplete={value => setAttributes({ color: value.hex })}
								disableAlpha
							/>
						)}
					/>
					<Dropdown
						position="bottom right"
						renderToggle={({ isOpen, onToggle }) => (
							<Button
								isPrimary
								onClick={onToggle}
								aria-expanded={isOpen}
								style={{ backgroundColor: attributes.background }}
							>
								Background Color
							</Button>
						)}
						renderContent={() => (
							<ColorPicker
								color={attributes.background}
								onChangeComplete={value =>
									setAttributes({ background: value.hex })
								}
								disableAlpha
							/>
						)}
					/>
					<Dropdown
						position="bottom right"
						renderToggle={({ isOpen, onToggle }) => (
							<Button
								isPrimary
								onClick={onToggle}
								aria-expanded={isOpen}
								style={{ backgroundColor: attributes.hoverColor }}
							>
								Hover Color
							</Button>
						)}
						renderContent={() => (
							<ColorPicker
								color={attributes.hoverColor}
								onChangeComplete={value =>
									setAttributes({ hoverColor: value.hex })
								}
								disableAlpha
							/>
						)}
					/>
					<Dropdown
						position="bottom right"
						renderToggle={({ isOpen, onToggle }) => (
							<Button
								isPrimary
								onClick={onToggle}
								aria-expanded={isOpen}
								style={{ backgroundColor: attributes.hoverBackground }}
							>
								Hover Background
							</Button>
						)}
						renderContent={() => (
							<ColorPicker
								color={attributes.hoverBackground}
								onChangeComplete={value =>
									setAttributes({ hoverBackground: value.hex })
								}
								disableAlpha
							/>
						)}
					/>
				</PanelBody>
			</InspectorControls>
			<div>{styleCss}</div>
		</Fragment>
	);
}
