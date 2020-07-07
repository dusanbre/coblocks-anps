<?php

/**
 * Register AnpsBlocks Settings
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @link      @@pkg.author_uri
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Main @@pkg.title Class
 *
 * @since 2.0.0
 */
class AnpsBlocks_Settings
{
	/**
	 * This plugin's instance.
	 *
	 * @var AnpsBlocks_Settings
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return AnpsBlocks_Settings
	 */
	public static function register()
	{
		if (null === self::$instance) {
			self::$instance = new AnpsBlocks_Settings();
		}

		return self::$instance;
	}

	/**
	 * The Constructor.
	 */
	public function __construct()
	{
		add_action('init', array($this, 'register_settings'));
		add_action('init', array($this, 'anpsblocks_settings_assets'));
		add_action('wp_loaded', array($this, 'anpsblocks_feature_propagation'));
		add_action('enqueue_block_editor_assets', array($this, 'anps_add_theme_styles'));
	}

	/**
	 * Localize CoBlock Settings Status AnpsBlocks settings.
	 *
	 * @access public
	 */
	public function anpsblocks_settings_assets()
	{
		wp_localize_script(
			'anpsblocks-editor',
			'anpsblocksSettings',
			array(
				'anpsblocksSettingsEnabled' => (bool) apply_filters('anpsblocks_show_settings_panel', true),
				'anpsblocksSettingsNonce'   => wp_create_nonce('wp_rest'),
			)
		);
	}

	/**
	 * Propagate AnpsBlocks settings to editor.
	 *
	 * @access public
	 */
	public function anpsblocks_feature_propagation()
	{
		if (!get_option('anpsblocks_custom_colors_controls_enabled')) {
			add_theme_support('disable-custom-colors');
		}

		if (!get_option('anpsblocks_gradient_presets_enabled')) {
			add_theme_support('__experimental-editor-gradient-presets', array());
			add_theme_support('__experimental-disable-custom-gradients', true);
		}

		if (!get_option('anpsblocks_color_panel_controls_enabled')) {
			add_theme_support('editor-color-palette', array());
			add_theme_support('__experimental-editor-gradient-presets', array());
			add_theme_support('__experimental-disable-custom-gradients', true);
			add_theme_support('disable-custom-colors');
		}
	}

	/**
	 * Register AnpsBlocks settings.
	 *
	 * @access public
	 */
	public function register_settings()
	{
		register_setting(
			'anpsblocks_layout_selector_controls_enabled',
			'anpsblocks_layout_selector_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __('Setting use to disable or enable layout selector controls across the site.', 'anpsblocks'),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'anpsblocks_typography_controls_enabled',
			'anpsblocks_typography_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __('Setting use to disable or enable typography controls across the site.', 'anpsblocks'),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'anpsblocks_custom_colors_controls_enabled',
			'anpsblocks_custom_colors_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __('Setting use to disable or enable custom color controls across the site.', 'anpsblocks'),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'anpsblocks_color_panel_controls_enabled',
			'anpsblocks_color_panel_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __('Setting use to disable or enable all color controls across the site.', 'anpsblocks'),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'anpsblocks_gradient_presets_enabled',
			'anpsblocks_gradient_presets_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __('Setting use to disable or enable gradient controls and presets across the site.', 'anpsblocks'),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);
	}

	/**
	 * anps_add_theme_styles
	 *
	 * @return void
	 */
	function anps_add_theme_styles()
	{
		wp_enqueue_style(
			"anps-components",
			get_template_directory_uri()  . '/css/components.css',
			array('wp-edit-blocks'),
			null
		);
		wp_enqueue_style(
			"anps-bootstrap",
			get_template_directory_uri()  . '/css/bootstrap.css',
			array('wp-edit-blocks'),
			null
		);
		wp_enqueue_style(
			"anps-core",
			get_template_directory_uri()  . '/css/core.css',
			array('wp-edit-blocks'),
			null
		);
	}
}

AnpsBlocks_Settings::register();
