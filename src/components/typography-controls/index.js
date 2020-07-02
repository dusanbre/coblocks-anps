/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * Internal dependencies
 */
import googleFonts from "./../../components/font-family/fonts";
import TypographyAttributes from "./attributes";
import TypograpyClasses from "./classes";
import TypographyTransforms from "./transforms";
import FontFamilyPicker from "./../../components/font-family/index";
import icons from "./icons";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component, Fragment } from "@wordpress/element";
import { compose } from "@wordpress/compose";
import { DOWN } from "@wordpress/keycodes";
import {
	RangeControl,
	withFallbackStyles,
	ToggleControl,
	Dropdown,
	IconButton,
	SelectControl,
	Toolbar
} from "@wordpress/components";
import { withSelect, select } from "@wordpress/data";

/**
 * Export
 */
export { TypographyAttributes, TypograpyClasses, TypographyTransforms };

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles((node, ownProps) => {
	const { textColor, fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector('[contenteditable="true"]');
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode
		? getComputedStyle(editableNode)
		: undefined;
	return {
		fallbackTextColor:
			textColor || !computedStyles ? undefined : computedStyles.color,
		fallbackFontSize:
			fontSize || customFontSize || !computedStyles
				? undefined
				: parseInt(computedStyles.fontSize) || undefined
	};
});

/**
 * Typography Component
 */
class TypographyControls extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allowedBlocks: []
		};
	}

	componentDidMount() {
		if (this.props.typographyEnabled) {
			this.setState({
				allowedBlocks: [
					"core/paragraph",
					"core/heading",
					"core/button",
					"core/list",
					"anpsblocks/row",
					"anpsblocks/column",
					"anpsblocks/accordion",
					"anpsblocks/accordion-item",
					"anpsblocks/click-to-tweet",
					"anpsblocks/alert",
					"anpsblocks/pricing-table",
					"anpsblocks/highlight"
				]
			});
		}
	}

	render() {
		if (!this.props.typographyEnabled) {
			return null;
		}

		const { allowedBlocks } = this.state;

		const {
			attributes,
			setAttributes,
			icon = icons.typography,
			label = __("Change typography", "anpsblocks")
		} = this.props;

		// Show line height on appropriate blocks.
		if (!allowedBlocks.includes(this.props.name)) {
			return null;
		}

		const {
			customFontSize,
			fontFamily,
			lineHeight,
			letterSpacing,
			noBottomSpacing,
			noTopSpacing,
			fontWeight,
			textTransform
		} = attributes;

		const weight = [
			{
				value: "",
				/* translators: typography style */
				label: __("Default", "anpsblocks")
			},
			{
				value: "normal",
				/* translators: typography style */
				label: __("Normal", "anpsblocks")
			},
			{
				value: "bold",
				/* translators: typography style */
				label: __("Bold", "anpsblocks")
			}
		];

		const transform = [
			{
				value: "",
				/* translators: typography style */
				label: __("Default", "anpsblocks")
			},
			{
				value: "uppercase",
				/* translators: typography style */
				label: __("Uppercase", "anpsblocks")
			},
			{
				value: "lowercase",
				/* translators: typography style */
				label: __("Lowercase", "anpsblocks")
			},
			{
				value: "capitalize",
				/* translators: typography style */
				label: __("Capitalize", "anpsblocks")
			},
			{
				value: "initial",
				/* translators: typography style */
				label: __("Normal", "anpsblocks")
			}
		];

		if (
			typeof googleFonts[fontFamily] !== "undefined" &&
			typeof googleFonts[fontFamily].weight !== "undefined"
		) {
			googleFonts[fontFamily].weight.forEach(k => {
				weight.push({ value: k, label: k });
			});
		}

		const onFontChange = value => {
			setAttributes({ fontFamily: value });

			if (
				typeof googleFonts[value] !== "undefined" &&
				typeof googleFonts[value].weight !== "undefined"
			) {
				if (
					fontWeight &&
					Object.values(googleFonts[fontFamily].weight).indexOf(fontWeight) < 0
				) {
					setAttributes({ fontWeight: undefined });
				}
			}
		};

		return (
			<Toolbar>
				<Dropdown
					className={classnames(
						"components-dropdown-menu",
						"components-anpsblocks-typography-dropdown"
					)}
					contentClassName="components-dropdown-menu__popover components-anpsblocks-typography-dropdown"
					renderToggle={({ isOpen, onToggle }) => {
						const openOnArrowDown = event => {
							if (!isOpen && event.keyCode === DOWN) {
								event.preventDefault();
								event.stopPropagation();
								onToggle();
							}
						};

						return (
							<IconButton
								className="components-dropdown-menu__toggle"
								icon={icon}
								onClick={onToggle}
								onKeyDown={openOnArrowDown}
								aria-haspopup="true"
								aria-expanded={isOpen}
								label={label}
								tooltip={label}
							>
								<span className="components-dropdown-menu__indicator" />
							</IconButton>
						);
					}}
					renderContent={() => (
						<Fragment>
							<div className="components-anpsblocks-typography-dropdown__inner">
								<FontFamilyPicker
									label={__("Font", "anpsblocks")}
									value={fontFamily}
									onChange={nextFontFamily => onFontChange(nextFontFamily)}
									className="components-base-control--with-flex components-anpsblocks-typography-dropdown__inner--font"
								/>
								{typeof attributes.textPanelFontWeight === "undefined" ||
								(typeof attributes.textPanelFontWeight !== "undefined" &&
									typeof attributes.textPanelFontWeight === "undefined") ? (
									<SelectControl
										label={__("Weight", "anpsblocks")}
										value={fontWeight}
										options={weight}
										onChange={nextFontWeight =>
											setAttributes({ fontWeight: nextFontWeight })
										}
										className="components-base-control--with-flex components-anpsblocks-typography-dropdown__inner--weight"
									/>
								) : null}
								{typeof attributes.textPanelTextTransform === "undefined" ||
								(typeof attributes.textPanelTextTransform !== "undefined" &&
									typeof attributes.textPanelTextTransform === "undefined") ? (
									<SelectControl
										label={__("Transform", "anpsblocks")}
										value={textTransform}
										options={transform}
										onChange={nextTextTransform =>
											setAttributes({ textTransform: nextTextTransform })
										}
										className="components-base-control--with-flex components-anpsblocks-typography-dropdown__inner--transform"
									/>
								) : null}
								{typeof attributes.textPanelHideSize === "undefined" ||
								(typeof attributes.textPanelHideSize !== "undefined" &&
									typeof attributes.textPanelHideSize === "undefined") ? (
									<RangeControl
										label={__("Size", "anpsblocks")}
										value={parseFloat(customFontSize) || undefined}
										onChange={nextFontSize =>
											setAttributes({ customFontSize: nextFontSize })
										}
										min={1}
										max={100}
										step={1}
										className="components-anpsblocks-typography-dropdown__inner--size"
									/>
								) : null}
								{typeof attributes.textPanelLineHeight === "undefined" ||
								(typeof attributes.textPanelLineHeight !== "undefined" &&
									typeof attributes.textPanelLineHeight === "undefined") ? (
									<RangeControl
										label={__("Line height", "anpsblocks")}
										value={parseFloat(lineHeight) || undefined}
										onChange={nextLineHeight =>
											setAttributes({ lineHeight: nextLineHeight })
										}
										min={1}
										max={3}
										step={0.01}
										className="components-anpsblocks-typography-dropdown__inner--line-height"
									/>
								) : null}
								{typeof attributes.textPanelLetterSpacing === "undefined" ||
								(typeof attributes.textPanelLetterSpacing !== "undefined" &&
									typeof attributes.textPanelLetterSpacing === "undefined") ? (
									<RangeControl
										label={__("Letter spacing", "anpsblocks")}
										value={parseFloat(letterSpacing) || undefined}
										onChange={nextLetterSpacing =>
											setAttributes({ letterSpacing: nextLetterSpacing })
										}
										min={-1}
										max={3}
										n
										step={0.1}
										className="components-anpsblocks-typography-dropdown__inner--letter-spacing"
									/>
								) : null}
								{typeof attributes.textPanelShowSpacingControls !==
									"undefined" &&
									attributes.textPanelShowSpacingControls && (
										<div className="components-anpsblocks-typography-dropdown__footer">
											<ToggleControl
												label={__("No top spacing", "anpsblocks")}
												checked={!!noTopSpacing}
												onChange={() =>
													setAttributes({ noTopSpacing: !noTopSpacing })
												}
											/>
											<ToggleControl
												label={__("No bottom spacing", "anpsblocks")}
												checked={!!noBottomSpacing}
												onChange={() =>
													setAttributes({ noBottomSpacing: !noBottomSpacing })
												}
											/>
										</div>
									)}
							</div>
						</Fragment>
					)}
				/>
			</Toolbar>
		);
	}
}

const applyWithSelect = withSelect(() => {
	const { getTypography } = select("anpsblocks-settings");

	return {
		typographyEnabled: getTypography()
	};
});

export default compose([applyFallbackStyles, applyWithSelect])(
	TypographyControls
);
