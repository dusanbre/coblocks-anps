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
		paddingRight,
		marginTopMobile,
		marginBottomMobile,
		marginLeftMobile,
		marginRightMobile,
		paddingTopMobile,
		paddingBottomMobile,
		paddingLeftMobile,
		paddingRightMobile,
		paddingUnit,
		marginUnit
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
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,

		paddingTop:
			paddingSize === "advanced" && paddingTop
				? paddingTop + paddingUnit
				: null,
		paddingRight:
			paddingSize === "advanced" && paddingRight
				? paddingRight + paddingUnit
				: null,
		paddingBottom:
			paddingSize === "advanced" && paddingBottom
				? paddingBottom + paddingUnit
				: null,
		paddingLeft:
			paddingSize === "advanced" && paddingLeft
				? paddingLeft + paddingUnit
				: null,
		marginTop:
			marginSize === "advanced" && marginTop ? marginTop + marginUnit : null,
		marginRight:
			marginSize === "advanced" && marginRight
				? marginRight + marginUnit
				: null,
		marginBottom:
			marginSize === "advanced" && marginBottom
				? marginBottom + marginUnit
				: null,
		marginLeft:
			marginSize === "advanced" && marginLeft ? marginLeft + marginUnit : null,
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

	const innerStylesMobile = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,

		paddingTop:
			paddingSize === "advanced" && paddingTopMobile
				? paddingTopMobile + paddingUnit
				: null,
		paddingRight:
			paddingSize === "advanced" && paddingRightMobile
				? paddingRightMobile + paddingUnit
				: null,
		paddingBottom:
			paddingSize === "advanced" && paddingBottomMobile
				? paddingBottomMobile + paddingUnit
				: null,
		paddingLeft:
			paddingSize === "advanced" && paddingLeftMobile
				? paddingLeftMobile + paddingUnit
				: null,
		marginTop:
			marginSize === "advanced" && marginTop ? marginTop + marginUnit : null,
		marginRight:
			marginSize === "advanced" && marginRight
				? marginRight + marginUnit
				: null,
		marginBottom:
			marginSize === "advanced" && marginBottom
				? marginBottom + marginUnit
				: null,
		marginLeft:
			marginSize === "advanced" && marginLeft ? marginLeft + marginUnit : null,
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

	function styles() {
		if (window.innerWidth < 800) {
			return innerStylesMobile;
		} else {
			return innerStyles;
		}
	}
	console.log(styles());
	return (
		<div
			className={classes}
			data-id={id}
			data-columns={columns}
			data-layout={layout}
		>
			<div className={classnames(innerClasses)} style={styles()}>
				{BackgroundVideo(attributes)}
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

export default Save;
