/*global anpsblocksSettings*/

/**
 * Styles
 */
import "./styles/style.scss";

/**
 * External dependencies
 */
import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";
import { Fragment, useState } from "@wordpress/element";
import { PluginMoreMenuItem } from "@wordpress/edit-post";
import { registerGenericStore } from "@wordpress/data";
import {
	registerPlugin,
	getPlugin,
	unregisterPlugin
} from "@wordpress/plugins";

/**
 * Internal dependencies
 */
import CoBlocksSettingsModal from "./anpsblocks-settings-modal";
import createCoBlocksStore from "./anpsblocks-settings-store.js";

if (
	typeof anpsblocksSettings !== "undefined" &&
	anpsblocksSettings.anpsblocksSettingsEnabled
) {
	const CoBlocksSettingsMenuItem = () => {
		const [isOpen, setOpen] = useState(false);

		const openModal = () => setOpen(true);
		const closeModal = () => setOpen(false);

		const props = {
			isOpen,
			openModal,
			closeModal
		};

		return (
			<Fragment>
				<PluginMoreMenuItem onClick={openModal}>
					{applyFilters(
						"anpsblocks-settings-title",
						__("Editor settings", "anpsblocks")
					)}
				</PluginMoreMenuItem>
				<CoBlocksSettingsModal {...props} />
			</Fragment>
		);
	};

	registerPlugin("anpsblocks-settings", {
		icon: "",
		render: CoBlocksSettingsMenuItem
	});

	registerGenericStore("anpsblocks-settings", createCoBlocksStore());
} else if (getPlugin("anpsblocks-settings")) {
	unregisterPlugin("anpsblocks-settings");
}
