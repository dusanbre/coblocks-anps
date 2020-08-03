/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

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
import * as list from "./blocks/list";
import * as button from "./blocks/button";
import * as timeline from "./blocks/timeline";
import * as cta from "./blocks/cta";
import * as cic from "./blocks/contact_info_card";
import * as blog from "./blocks/blog";
import * as recentBlog from "./blocks/recent_blog";
import * as heading from "./blocks/heading";
import * as icon from "./blocks/icon";
import * as logos from "./blocks/logos";
import * as portfolio from "./blocks/portfolio";
import * as recentPortfolio from "./blocks/recent_portfolio";
import * as testimonials from "./blocks/testimonials";
import * as galerySlider from "./blocks/galery_slider";
import * as featuredContent from "./blocks/featured_content";

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
	[
		column,
		events,
		eventItem,
		map,
		row,
		alert,
		list,
		button,
		timeline,
		cta,
		cic,
		blog,
		recentBlog,
		heading,
		icon,
		logos,
		portfolio,
		recentPortfolio,
		testimonials,
		galerySlider,
		featuredContent
	].forEach(registerBlock);
};

registerCoBlocksBlocks();
