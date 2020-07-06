<?php

/**
 * Run on plugin install.
 *
 * @package AnpsBlocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * AnpsBlocks_Install Class
 */
class AnpsBlocks_Install
{

	/**
	 * Constructor
	 */
	public function __construct()
	{
		register_activation_hook(ANPSBLOCKS_PLUGIN_FILE, array($this, 'register_defaults'));
	}

	/**
	 * Register plugin defaults.
	 */
	public function register_defaults()
	{
		if (is_admin()) {
			if (!get_option('anpsblocks_date_installed')) {
				add_option('anpsblocks_date_installed', gmdate('Y-m-d h:i:s'));
			}
		}
	}
}

return new AnpsBlocks_Install();
