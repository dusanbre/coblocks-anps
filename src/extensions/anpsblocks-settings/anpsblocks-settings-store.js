/*global anpsblocksSettings*/

/**
 * WordPress dependencies
 */
import apiFetch from "@wordpress/api-fetch";
import { applyFilters } from "@wordpress/hooks";

export default function createCoBlocksStore() {
	const settingsNonce = anpsblocksSettings.anpsblocksSettingsNonce;
	apiFetch.use(apiFetch.createNonceMiddleware(settingsNonce));

	let storeChanged = () => {};
	const settings = {
		customColors: true,
		colorsPanel: true,
		gradients: true,
		typography: true,
		layoutSelector: false // default false to prevent screen flicker.
	};

	const layoutSelectorEnabled = applyFilters(
		"anpsblocks-show-layout-selector",
		true
	);

	apiFetch({
		path: "/wp/v2/settings/",
		method: "GET",
		headers: {
			"X-WP-Nonce": settingsNonce
		}
	}).then(res => {
		settings.customColors =
			res.anpsblocks_custom_colors_controls_enabled || false;
		settings.gradients = res.anpsblocks_gradient_presets_enabled || false;
		settings.typography = res.anpsblocks_typography_controls_enabled || false;
		settings.colorsPanel = res.anpsblocks_color_panel_controls_enabled || false;
		settings.layoutSelector = layoutSelectorEnabled
			? res.anpsblocks_layout_selector_controls_enabled || false
			: false;
		storeChanged();
	});

	const selectors = {
		getLayoutSelector() {
			return settings.layoutSelector;
		},
		getCustomColors() {
			return settings.customColors;
		},
		getGradients() {
			return settings.gradients;
		},
		getTypography() {
			return settings.typography;
		},
		getColorPanel() {
			return settings.colorsPanel;
		}
	};

	const actions = {
		setCustomColors() {
			const toggle = !settings.customColors;
			settings.customColors = toggle;
			storeChanged();
			apiFetch({
				path: "/wp/v2/settings/",
				method: "POST",
				headers: {
					"X-WP-Nonce": settingsNonce
				},
				data: {
					anpsblocks_custom_colors_controls_enabled: toggle
				}
			});
		},
		setColorPanel() {
			const toggle = !settings.colorsPanel;
			settings.colorsPanel = toggle;
			apiFetch({
				path: "/wp/v2/settings/",
				method: "POST",
				headers: {
					"X-WP-Nonce": settingsNonce
				},
				data: {
					anpsblocks_color_panel_controls_enabled: toggle,
					anpsblocks_gradient_presets_enabled: toggle,
					anpsblocks_custom_colors_controls_enabled: toggle
				}
			});
			settings.gradients = toggle;
			settings.customColors = toggle;
			storeChanged();
		},
		setGradients() {
			const toggle = !settings.gradients;
			settings.gradients = toggle;
			storeChanged();
			apiFetch({
				path: "/wp/v2/settings/",
				method: "POST",
				headers: {
					"X-WP-Nonce": settingsNonce
				},
				data: {
					anpsblocks_gradient_presets_enabled: toggle
				}
			});
		},
		setLayoutSelector() {
			const toggle = !settings.layoutSelector;
			settings.layoutSelector = toggle;
			storeChanged();
			apiFetch({
				path: "/wp/v2/settings/",
				method: "POST",
				headers: {
					"X-WP-Nonce": settingsNonce
				},
				data: {
					anpsblocks_layout_selector_controls_enabled: toggle
				}
			});
		},
		setTypography() {
			const toggle = !settings.typography;
			settings.typography = toggle;
			storeChanged();
			apiFetch({
				path: "/wp/v2/settings/",
				method: "POST",
				headers: {
					"X-WP-Nonce": settingsNonce
				},
				data: {
					anpsblocks_typography_controls_enabled: toggle
				}
			});
		}
	};

	return {
		getSelectors() {
			return selectors;
		},
		getActions() {
			return actions;
		},
		subscribe(listener) {
			storeChanged = listener;
		}
	};
}
