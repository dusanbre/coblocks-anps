/**
 * Internal dependencies
 */
import Section from "./section";

/**
 * WordPress dependencies
 */
import { Component } from "@wordpress/element";
import { compose } from "@wordpress/compose";
import { applyFilters } from "@wordpress/hooks";
import { getPlugin } from "@wordpress/plugins";
import { CheckboxControl, Modal, HorizontalRule } from "@wordpress/components";
import { withDispatch, withSelect, select } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

class CoBlocksSettingsModal extends Component {
	processGradientPresets(newSetting) {
		const { getSettings } = this.props;
		let gradientPresets = getSettings().gradients;

		if (newSetting) {
			localStorage.setItem("gradientsPresets", JSON.stringify(gradientPresets));
			gradientPresets = [];
		} else {
			const storedPresets = localStorage.getItem("gradientsPresets");
			if (storedPresets) {
				gradientPresets = JSON.parse(storedPresets);
			}
		}
		return gradientPresets;
	}

	processColorPresets(newSetting) {
		const { getSettings } = this.props;
		let colorPresets = getSettings().colors;

		if (newSetting) {
			localStorage.setItem("colorPresets", JSON.stringify(colorPresets));
			colorPresets = [];
		} else {
			const storedPresets = localStorage.getItem("colorPresets");
			if (storedPresets) {
				colorPresets = JSON.parse(storedPresets);
			}
		}
		return colorPresets;
	}

	updateColorPanel(newSetting) {
		const {
			updateSettings,
			setColorPanel,
			setCustomColors,
			setGradients,
			getSettings
		} = this.props;

		const supportsGradients = getSettings().gradients !== undefined;
		if (supportsGradients) {
			updateSettings({
				colors: this.processColorPresets(newSetting),
				disableCustomColors: newSetting,
				disableCustomGradients: newSetting,
				gradients: this.processGradientPresets(newSetting)
			});
		} else {
			updateSettings({
				colors: this.processColorPresets(newSetting),
				disableCustomColors: newSetting
			});
		}

		setCustomColors();
		setGradients();
		setColorPanel();
	}

	updateCustomColorsSetting(newSetting) {
		const { updateSettings, setCustomColors } = this.props;
		updateSettings({ disableCustomColors: newSetting });
		setCustomColors();
	}

	updateGradientsControlsSetting(newSetting) {
		const { setGradients, updateSettings } = this.props;

		updateSettings({
			disableCustomGradients: newSetting,
			gradients: this.processGradientPresets(newSetting)
		});
		setGradients();
	}

	updateLayoutSelectorSetting() {
		const { setLayoutSelector } = this.props;
		setLayoutSelector();
	}

	updateTypographyControlsSetting() {
		const { setTypography } = this.props;
		setTypography();
	}

	render() {
		const {
			isOpen,
			closeModal,
			typography,
			customColors,
			gradientControls,
			getSettings,
			colorPanel,
			layoutSelector
		} = this.props;

		if (!isOpen) {
			return null;
		}

		const supportsGradients = getSettings().gradients !== undefined;
		const colorPanelEnabled = !!colorPanel;
		const showLayoutSelectorControl =
			applyFilters("anpsblocks-show-layout-selector", true) &&
			!!getPlugin("anpsblocks-layout-selector");

		return (
			<Modal
				title={applyFilters(
					"anpsblocks-settings-title",
					__("Editor settings", "anpsblocks")
				)}
				onRequestClose={closeModal}
			>
				<div className="anpsblocks-modal__content">
					<Section title={__("General")}>
						{showLayoutSelectorControl && (
							<>
								<HorizontalRule />
								<CheckboxControl
									label={__("Layout selector", "anpsblocks")}
									help={__(
										"Allow layout selection on new pages.",
										"anpsblocks"
									)}
									onChange={() => this.updateLayoutSelectorSetting()}
									checked={!!layoutSelector}
								/>
							</>
						)}
						<HorizontalRule />
						<CheckboxControl
							label={__("Typography controls", "anpsblocks")}
							help={__("Allow block-level typography controls.", "anpsblocks")}
							onChange={() => this.updateTypographyControlsSetting()}
							checked={!!typography}
						/>
						<HorizontalRule />
						<CheckboxControl
							label={__("Color settings", "anpsblocks")}
							help={__(
								"Allow color settings throughout the editor.",
								"anpsblocks"
							)}
							onChange={() => this.updateColorPanel(!!colorPanel)}
							checked={!!colorPanel}
						/>
						{colorPanelEnabled && (
							<>
								<HorizontalRule />
								<CheckboxControl
									label={__("Custom color pickers", "anpsblocks")}
									help={__("Allow styling with custom colors.", "anpsblocks")}
									onChange={() =>
										this.updateCustomColorsSetting(!!customColors)
									}
									checked={!!customColors}
								/>
							</>
						)}
						<HorizontalRule />
						{colorPanelEnabled && supportsGradients && (
							<>
								<CheckboxControl
									label={__("Gradient styles", "anpsblocks")}
									help={__("Allow styling with gradient fills.", "anpsblocks")}
									onChange={() =>
										this.updateGradientsControlsSetting(!!gradientControls)
									}
									checked={!!gradientControls}
								/>
								<HorizontalRule />
							</>
						)}
					</Section>
				</div>
			</Modal>
		);
	}
}

const applyWithSelect = withSelect(() => {
	const {
		getTypography,
		getCustomColors,
		getGradients,
		getColorPanel,
		getLayoutSelector
	} = select("anpsblocks-settings");
	const { getSettings } = select("core/block-editor");

	return {
		typography: getTypography(),
		customColors: getCustomColors(),
		gradientControls: getGradients(),
		colorPanel: getColorPanel(),
		layoutSelector: getLayoutSelector(),
		getSettings
	};
});

const applyWithDispatch = withDispatch(dispatch => {
	const {
		setTypography,
		setCustomColors,
		setGradients,
		setColorPanel,
		setLayoutSelector
	} = dispatch("anpsblocks-settings");
	const { updateSettings } = dispatch("core/block-editor");

	return {
		setColorPanel,
		setCustomColors,
		setTypography,
		setLayoutSelector,
		setGradients,
		updateSettings
	};
});

export default compose([applyWithSelect, applyWithDispatch])(
	CoBlocksSettingsModal
);
