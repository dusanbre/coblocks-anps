<?php

/**
 * CoBlocks Uninstall
 *
 * @package CoBlocks
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {

	die;
}

$anpsblocks_options = array(
	'anpsblocks_settings_api',
	'anpsblocks_plugin_feedback_activation_date',
	'anpsblocks_date_installed',
	'anpsblocks_google_maps_api_key',
	'anpsblocks_plugin_feedback_no_bug',
);

foreach ($anpsblocks_options as $anpsblocks_option) {

	delete_option($anpsblocks_option);
}
