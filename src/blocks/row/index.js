/**
 * Internal dependencies
 */
import edit from "./edit";
import deprecated from "./deprecated";
import DimensionsAttributes from "../../components/dimensions-control/attributes";
import { getEditWrapperProps } from "./utilities";
import icon from "./icon";
import metadata from "./block.json";
import variations from "./variations";
import save from "./save";
import transforms from "./transforms";
import { BackgroundAttributes } from "../../components/background";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes
};

const settings = {
	/* translators: block name */
	title: __("Row", "anpsblocks"),
	/* translators: block description */
	description: __(
		"Add a structured wrapper for column blocks, then add content blocks you’d like to the columns.",
		"anpsblocks"
	),
	icon,
	keywords: [
		"anpsblocks",
		/* translators: block keyword */
		__("rows", "anpsblocks"),
		/* translators: block keyword */
		__("columns", "anpsblocks"),
		/* translators: block keyword */
		__("layouts", "anpsblocks")
	],
	supports: {
		align: ["wide", "full"],
		anchor: true,
		stackedOnMobile: true,
		coBlocksSpacing: true
	},
	attributes,
	variations,
	transforms,
	edit,
	getEditWrapperProps,
	save,
	deprecated
};

export { name, category, metadata, settings };
