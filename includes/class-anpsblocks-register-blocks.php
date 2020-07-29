<?php

/**
 * Register blocks.
 *
 * @package AnpsBlocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

//require files for render on frontend
require_once(ANPSBLOCKS_PLUGIN_DIR . 'src/blocks/button/render.php');
require_once(ANPSBLOCKS_PLUGIN_DIR . 'src/blocks/blog/render.php');
require_once(ANPSBLOCKS_PLUGIN_DIR . 'src/blocks/recent_blog/render.php');
require_once(ANPSBLOCKS_PLUGIN_DIR . 'src/blocks/portfolio/render.php');

/**
 * Load registration for our blocks.
 *
 * @since 1.6.0
 */
class AnpsBlocks_Register_Blocks
{


	/**
	 * This plugin's instance.
	 *
	 * @var AnpsBlocks_Register_Blocks
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return AnpsBlocks_Register_Blocks
	 */
	public static function register()
	{
		if (null === self::$instance) {
			self::$instance = new AnpsBlocks_Register_Blocks();
		}

		return self::$instance;
	}

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

		add_action('init', array($this, 'register_blocks'), 99);
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function register_blocks()
	{

		// Return early if this function does not exist.
		if (!function_exists('register_block_type')) {
			return;
		}

		// Shortcut for the slug.
		$slug = $this->slug;

		register_block_type(
			$slug . '/alert',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/button',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
				'render_callback' => 'anps_render_button'
			)
		);
		register_block_type(
			$slug . '/blog',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
				'render_callback' => 'anps_render_blog'
			)
		);
		register_block_type(
			$slug . '/recent-blog',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
				'render_callback' => 'anps_render_recent_blog'
			)
		);
		register_block_type(
			$slug . '/portfolio',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
				'render_callback' => 'anps_render_portfolio'
			)
		);
	}
}

AnpsBlocks_Register_Blocks::register();
