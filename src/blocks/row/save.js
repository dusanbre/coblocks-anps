/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * Internal dependencies
 */
import {
	BackgroundClasses,
	BackgroundVideo
} from "../../components/background";

/**
 * WordPress dependencies
 */
import { getColorClassName, InnerBlocks } from "@wordpress/block-editor";

function Save({ attributes }) {
	const {
		coblocks,
		backgroundColor,
		backgroundImg,
		columns,
		customBackgroundColor,
		customTextColor,
		gutter,
		id,
		layout,
		isStackedOnMobile,
		marginSize,
		paddingSize,
		textColor,
		focalPoint,
		hasParallax,
		backgroundType,
		verticalAlignment,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight
	} = attributes;

	const textClass = getColorClassName("color", textColor);
	const backgroundClass = getColorClassName(
		"background-color",
		backgroundColor
	);

	let classes = classnames({
		[`coblocks-row--${id}`]: id
	});

	if (coblocks && typeof coblocks.id !== "undefined") {
		classes = classnames(classes, `coblocks-row-${coblocks.id}`);
	}

	const innerClasses = [
		"wp-block-coblocks-row__inner",
		...BackgroundClasses(attributes),
		{ "has-text-color": textColor || customTextColor },
		{ [textClass]: textClass },
		{ [`has-${gutter}-gutter`]: gutter },
		{ "has-padding": paddingSize && paddingSize !== "no" },
		{ [`has-${paddingSize}-padding`]: !["advanced"].includes(paddingSize) },
		{ "has-margin": marginSize && marginSize !== "no" },
		{ [`has-${marginSize}-margin`]: !["advanced"].includes(marginSize) },
		{ "is-stacked-on-mobile": isStackedOnMobile },
		{ [`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment }
	];

	const innerStyles = {
		// marginTop: marginTop ? marginTop : null,
		// marginBottom: marginBottom ? marginBottom : null,
		// marginLeft: marginLeft ? marginLeft : null,
		// marginRight: marginRight ? marginRight : null,
		// paddingTop: paddingTop ? paddingTop : null,
		// paddingBottom: paddingBottom ? paddingBottom : null,
		// paddingLeft: paddingLeft ? paddingLeft : null,
		// paddingRight: paddingRight ? paddingRight : null,
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		paddingTop:
			paddingSize === "advanced" && paddingTop
				? paddingTop + paddingUnit
				: undefined,
		paddingRight:
			paddingSize === "advanced" && paddingRight
				? paddingRight + paddingUnit
				: undefined,
		paddingBottom:
			paddingSize === "advanced" && paddingBottom
				? paddingBottom + paddingUnit
				: undefined,
		paddingLeft:
			paddingSize === "advanced" && paddingLeft
				? paddingLeft + paddingUnit
				: undefined,
		marginTop:
			marginSize === "advanced" && marginTop
				? marginTop + marginUnit
				: undefined,
		marginRight:
			marginSize === "advanced" && marginRight
				? marginRight + marginUnit
				: undefined,
		marginBottom:
			marginSize === "advanced" && marginBottom
				? marginBottom + marginUnit
				: undefined,
		marginLeft:
			marginSize === "advanced" && marginLeft
				? marginLeft + marginUnit
				: undefined,
		backgroundImage:
			backgroundImg && backgroundType === "image"
				? `url(${backgroundImg})`
				: undefined,
		backgroundPosition:
			focalPoint && !hasParallax
				? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
				: undefined,
		color: textClass ? undefined : customTextColor
	};
	console.log(attributes);

	return (
		<div
			className={classes}
			data-id={id}
			data-columns={columns}
			data-layout={layout}
		>
			<div className={classnames(innerClasses)} style={innerStyles}>
				{BackgroundVideo(attributes)}
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

export default Save;
