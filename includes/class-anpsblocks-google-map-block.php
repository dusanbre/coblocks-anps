<?php

/**
 * Load assets and meta for Google Map Block
 *
 * @package AnpsBlocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Load assets and settings for the Google Map block.
 *
 * @since 1.0.0
 */
class AnpsBlocks_Google_Map_Block
{


	/**
	 * This plugin's instance.
	 *
	 * @var AnpsBlocks_Google_Map_Block
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return AnpsBlocks_Google_Map_Block
	 */
	public static function register()
	{
		if (null === self::$instance) {
			self::$instance = new AnpsBlocks_Google_Map_Block();
		}

		return self::$instance;
	}

	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $url
	 */
	private $url;

	/**
	 * The Plugin slug.
	 *
	 * @var string $slug
	 */
	private $slug;

	/**
	 * The Constructor.
	 */
	public function __construct()
	{
		$this->slug = 'anpsblocks';
		$this->url  = untrailingslashit(plugins_url('/', dirname(__FILE__)));

		add_action('wp_enqueue_scripts', array($this, 'map_assets'));
		add_action('the_post', array($this, 'map_assets'));
		add_action('init', array($this, 'register_settings'));
	}

	/**
	 * Enqueue front-end assets for blocks.
	 *
	 * @access public
	 */
	public function map_assets()
	{

		// Retrieve the Google Maps API key.
		$key = get_option('anpsblocks_google_maps_api_key');

		// Define where the asset is loaded from.
		$dir = AnpsBlocks()->asset_source('js');

		// Determine whether a $post contains a Map block.
		if (has_block('anpsblocks/map') && $key) {

			wp_enqueue_script(
				$this->slug . '-google-maps',
				$dir . $this->slug . '-google-maps.js',
				array('jquery'),
				ANPSBLOCKS_VERSION,
				true
			);

			if (!is_admin()) {

				$locale = explode('_', get_locale());

				wp_enqueue_script(
					$this->slug . '-google-maps-api',
					'https://maps.googleapis.com/maps/api/js?key=' . esc_attr($key) . '&language=' . esc_attr($locale[0]),
					array($this->slug . '-google-maps'),
					ANPSBLOCKS_VERSION,
					true
				);
			}

			wp_localize_script($this->slug . '-google-maps', 'anpsblocksGoogleMaps', array('url' => $this->url));
		}
	}

	/**
	 * Register block settings.
	 *
	 * @access public
	 */
	public function register_settings()
	{
		register_setting(
			'anpsblocks_google_maps_api_key',
			'anpsblocks_google_maps_api_key',
			array(
				'type'              => 'string',
				'description'       => __('Google Map API key for map rendering', 'anpsblocks'),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
	}
}

AnpsBlocks_Google_Map_Block::register();
