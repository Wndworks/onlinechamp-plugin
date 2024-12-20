<?php
/*
Plugin Name: OnlineChamp
Plugin URI: https://onlinechamp.nl
Description: OnlineChamp theme extended
Version: 1.3
Author: OnlineChamp
Author URI: https://onlinechamp.nl
License: GPL2
Text Domain: onlinechamp
*/

require_once plugin_dir_path( __FILE__ ) . 'includes/insert-scripts.php';

/** Update checker  **/
require plugin_dir_path( __FILE__ ) . 'includes/plugin-update-checker/plugin-update-checker.php';
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