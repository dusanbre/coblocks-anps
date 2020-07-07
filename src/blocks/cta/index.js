/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import icons from "../../utils/icons/anps-icon.js";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...metadata.attributes
};

const settings = {
	/* translators: block name */
	title: __("Call To Action", "anpsblocks"),
	/* translators: block description */
	description: __("Anps call to action block", "anpsblocks"),
	icon: icons.anps,
	keywords: [
		"anpsblocks",
		/* translators: block keyword */
		__("call to action", "anpsblocks"),
		/* translators: block keyword */
		__("anps", "anpsblocks"),
		/* translators: block keyword */
		__("cta", "anpsblocks")
	],
	supports: {
		align: ["wide", "full"]
	},
	attributes,
	edit,
	save
};

export { name, category, metadata, settings };
