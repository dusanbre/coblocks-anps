/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

// Register block category
import "./utils/block-category";

// Extensions
import "./extensions/colors/inspector";
import "./extensions/typography";
import "./extensions/attributes";
import "./extensions/advanced-controls";
import "./extensions/list-styles";
import "./extensions/button-styles";
import "./extensions/button-controls";
import "./extensions/image-styles";
import "./extensions/cover-styles";
import "./extensions/replace-image";
import "./extensions/image-crop";
import "./extensions/anpsblocks-settings/";
import "./extensions/layout-selector";

// Formats
import "./formats";

// Categories Helper
import { supportsCollections } from "./utils/block-helpers";

// Deprecate Blocks
import "./js/deprecations/deprecate-anpsblocks-buttons.js";

// Register Blocks

import * as column from "./blocks/row/column";
import * as events from "./blocks/events";
import * as eventItem from "./blocks/events/event-item";
import * as map from "./blocks/map";
import * as row from "./blocks/row";
import * as alert from "./blocks/alert";

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = block => {
	if (!block) {
		return;
	}

	let { category } = block;

	const { name, settings } = block;

	if (!supportsCollections() && !name.includes("gallery")) {
		category = "anpsblocks";
	}

	registerBlockType(name, {
		category,
		...settings
	});
};

/**
 * Function to register blocks provided by CoBlocks.
 */
export const registerCoBlocksBlocks = () => {
	[column, events, eventItem, map, row, alert].forEach(registerBlock);
};

registerCoBlocksBlocks();
