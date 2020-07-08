/*
Props : 
attributes - passed from parend component 
index - passed from parent component like index in function (required for indexing repeated items)
setAttr - setAttributes function passed from parent component.When pick color you must be able to set that value to attributes
attrValue - passed from parent component.It is the value in array of attributes,witch you want to be seted
title - display name of component 
attrToSet - attribute to be seted (must be array witch contains all attributes that you want to set)
*/

import React, { useState } from "react";
const { Button, Dropdown, ColorPicker } = wp.components;

export default function rep({
	attributes,
	index,
	setAttr,
	attrValue,
	title,
	attrToSet,
}) {
	//use state for switching color contrast
	const [colorState, setColorState] = useState();

	const handleColorChange = (value, index) => {
		const text = [...attributes.text];
		text[index][attrValue] = value.hex;
		setAttr({ attrToSet });
	};

	const switcher = (value) => {
		const rgb = value.hsl;
		if (rgb.l >= 50) {
			setColorState("white");
		} else if (rgb.l < 50) {
			setColorState("black");
		}
	};

	let colorClass;
	if (colorState == "white") {
		colorClass = "black";
	} else if (colorState == "black") {
		colorClass = "white";
	}

	return (
		<div>
			<Dropdown
				position="bottom right"
				renderToggle={({ isOpen, onToggle }) => (
					<Button
						className="button-anps-dusan"
						isPrimary
						onClick={onToggle}
						aria-expanded={isOpen}
						style={{
							backgroundColor: attributes.text[index][attrValue],
							color: colorClass,
						}}
					>
						{title}
					</Button>
				)}
				renderContent={() => (
					<ColorPicker
						onChangeComplete={(value) => {
							handleColorChange(value, index);
							switcher(value);
						}}
						disableAlpha
					/>
				)}
			/>
		</div>
	);
}
