<?php

/**
 * Plugin Name: AnpsBlocks
 * Description: Anps gutenberg blocks plugin
 * Author: AnpsThemes
 * Author URI: https://www.anpsthemes.com
 * Version: 3.0.0
 * Text Domain: anps
 * Domain Path: /languages
 * Tested up to: 5.4
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

define('ANPSBLOCKS_VERSION', '1.0.0');
define('ANPSBLOCKS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('ANPSBLOCKS_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ANPSBLOCKS_PLUGIN_FILE', __FILE__);
define('ANPSBLOCKS_PLUGIN_BASE', plugin_basename(__FILE__));
define('ANPSBLOCKS_REVIEW_URL', 'https://anpsthemes.com/');

if (!class_exists('AnpsBlocks')) :
	/**
	 * Main AnpsBlocks Class.
	 *
	 * @since 1.0.0
	 */
	final class AnpsBlocks
	{
		/**
		 * This plugin's instance.
		 *
		 * @var AnpsBlocks
		 * @since 1.0.0
		 */
		private static $instance;

		/**
		 * Main AnpsBlocks Instance.
		 *
		 * Insures that only one instance of AnpsBlocks exists in memory at any one
		 * time. Also prevents needing to define globals all over the place.
		 *
		 * @since 1.0.0
		 * @static
		 * @return object|AnpsBlocks The one true AnpsBlocks
		 */
		public static function instance()
		{
			if (!isset(self::$instance) && !(self::$instance instanceof AnpsBlocks)) {
				self::$instance = new AnpsBlocks();
				self::$instance->init();
				self::$instance->includes();
			}
			return self::$instance;
		}

		/**
		 * Throw error on object clone.
		 *
		 * The whole idea of the singleton design pattern is that there is a single
		 * object therefore, we don't want the object to be cloned.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __clone()
		{
			// Cloning instances of the class is forbidden.
			_doing_it_wrong(__FUNCTION__, esc_html__('Something went wrong.', 'anpsblocks'), '1.0');
		}

		/**
		 * Disable unserializing of the class.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __wakeup()
		{
			// Unserializing instances of the class is forbidden.
			_doing_it_wrong(__FUNCTION__, esc_html__('Something went wrong.', 'anpsblocks'), '1.0');
		}

		/**
		 * Include required files.
		 *
		 * @access private
		 * @since 1.0.0
		 * @return void
		 */
		private function includes()
		{
			require_once ANPSBLOCKS_PLUGIN_DIR . 'includes/class-anpsblocks-block-assets.php';
			require_once ANPSBLOCKS_PLUGIN_DIR . 'includes/class-anpsblocks-register-blocks.php';
			require_once ANPSBLOCKS_PLUGIN_DIR . 'includes/class-anpsblocks-generated-styles.php';
			require_once ANPSBLOCKS_PLUGIN_DIR . 'includes/class-anpsblocks-form.php';
			require_once ANPSBLOCKS_PLUGIN_DIR . 'includes/class-anpsblocks-google-map-block.php';
			require_once ANPSBLOCKS_PLUGIN_DIR . 'includes/class-anpsblocks-settings.php';
			require_once ANPSBLOCKS_PLUGIN_DIR . 'includes/class-anpsblocks-register-category.php';
			require_once ANPSBLOCKS_PLUGIN_DIR . 'includes/helpers.php';


			// Require the Gutenberg plugin for specific components.
			include_once ABSPATH . 'wp-admin/includes/plugin.php';
			$installed_plugins = get_plugins();

			$gutenberg_plugin_file    = 'gutenberg/gutenberg.php';
			$gutenberg_plugin_version = empty($installed_plugins[$gutenberg_plugin_file]) ? null : $installed_plugins[$gutenberg_plugin_file]['Version'];

			if (is_admin() && is_plugin_active($gutenberg_plugin_file) && version_compare($gutenberg_plugin_version, '8.0.0', '>=')) {
				require_once ANPSBLOCKS_PLUGIN_DIR . 'src/extensions/layout-selector/index.php';
			}

			if (is_admin() || (defined('WP_CLI') && WP_CLI)) {
				require_once ANPSBLOCKS_PLUGIN_DIR . 'includes/admin/class-anpsblocks-install.php';
				require_once ANPSBLOCKS_PLUGIN_DIR . 'includes/admin/class-anpsblocks-crop-settings.php';
			}
		}

		/**
		 * Load actions
		 *
		 * @return void
		 */
		private function init()
		{
			add_action('plugins_loaded', array($this, 'load_textdomain'), 99);
			add_action('enqueue_block_editor_assets', array($this, 'block_localization'));
		}

		/**
		 * If debug is on, serve unminified source assets.
		 *
		 * @since 1.0.0
		 * @param string|string $type The type of resource.
		 * @param string|string $directory Any extra directories needed.
		 */
		public function asset_source($type = 'js', $directory = null)
		{

			if ('js' === $type) {
				return ANPSBLOCKS_PLUGIN_URL . 'dist/' . $type . '/' . $directory;
			} else {
				return ANPSBLOCKS_PLUGIN_URL . 'dist/css/' . $directory;
			}
		}

		/**
		 * Loads the plugin language files.
		 *
		 * @access public
		 * @since 1.0.0
		 * @return void
		 */
		public function load_textdomain()
		{
			load_plugin_textdomain('anpsblocks', false, basename(ANPSBLOCKS_PLUGIN_DIR) . '/languages');
		}

		/**
		 * Enqueue localization data for our blocks.
		 *
		 * @access public
		 */
		// public function block_localization()
		// {
		// 	if (function_exists('wp_set_script_translations')) {
		// 		wp_set_script_translations('anpsblocks-editor', 'anpsblocks', ANPSBLOCKS_PLUGIN_DIR . '/languages');
		// 	}
		// }

		/**
		 * Is an AMP endpoint.
		 *
		 * @return bool Whether the current response will be AMP.
		 */
		public function is_amp()
		{
			return function_exists('is_amp_endpoint') && is_amp_endpoint();
		}
	}
endif;

/**
 * The main function for that returns AnpsBlocks
 *
 * The main function responsible for returning the one true AnpsBlocks
 * Instance to functions everywhere.
 *
 * Use this function like you would a global variable, except without needing
 * to declare the global.
 *
 * Example: <?php $anpsblocks = AnpsBlocks(); ?>
 *
 * @since 1.0.0
 * @return object|AnpsBlocks The one true AnpsBlocks Instance.
 */
function anpsblocks()
{
	return AnpsBlocks::instance();
}

// Get the plugin running. Load on plugins_loaded action to avoid issue on multisite.
if (function_exists('is_multisite') && is_multisite()) {
	add_action('plugins_loaded', 'anpsblocks', 90);
} else {
	anpsblocks();
}
