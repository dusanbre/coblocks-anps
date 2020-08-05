/**
 * Internal dependencies
 */
import edit from "./edit";
import metadata from "./block.json";
import save from "./save";
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
	title: __("Error 404", "anpsblocks"),
	/* translators: block description */
	description: __("Anps 404 block", "anpsblocks"),
	icon: icons.anps,
	keywords: [
		"anpsblocks",
		/* translators: block keyword */
		__("404", "anpsblocks"),
		/* translators: block keyword */
		__("anps", "anpsblocks"),
		/* translators: block keyword */
		__("error", "anpsblocks")
	],
	supports: {
		align: ["wide", "full"]
	},
	attributes,
	edit,
	save
};

export { name, category, metadata, settings };
