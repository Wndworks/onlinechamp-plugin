<?php
/*
Plugin Name: OnlineChamp
Plugin URI: https://onlinechamp.nl
Description: OnlineChamp theme extended
Version: 1.4
Author: OnlineChamp
Author URI: https://onlinechamp.nl
License: GPL2
Text Domain: onlinechamp
*/

//Set global plugin url
if ( ! defined( 'PLUGIN_URL' ) ) {
    define( 'PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

//Set global plugin path
if ( ! defined( 'PLUGIN_PATH' ) ) {
    define( 'PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
}

require_once PLUGIN_PATH . 'includes/insert-scripts.php';

/** Update checker  **/
require PLUGIN_PATH . 'includes/plugin-update-checker/plugin-update-checker.php';
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$myUpdateChecker = PucFactory::buildUpdateChecker(
	'https://github.com/Wndworks/onlinechamp-plugin',
	__FILE__,
	'onlinechamp-extended'
);

//Set the branch that contains the stable release.
$myUpdateChecker->setBranch('main');

//Optional: If you're using a private repository, specify the access token like this:
//$myUpdateChecker->setAuthentication('your-token-here');