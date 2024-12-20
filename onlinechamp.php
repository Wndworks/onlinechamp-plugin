<?php
/*
Plugin Name: OnlineChamp
Plugin URI: https://onlinechamp.nl
Update URI: https://raw.githubusercontent.com/Wndworks/onlinechamp-plugin/refs/heads/main/updates/updates.json
Description: OnlineChamp theme extended
Version: 1.0
Author: OnlineChamp
Author URI: https://onlinechamp.nl
License: GPL2
Text Domain: onlinechamp
*/

function insert_scripts() {

    // Get the file path for 'js/main.js' in the plugin
    $file_path = plugin_dir_path( __FILE__ ) . 'js/main.js';

    // Get the last modified time of the file to use as the version
    $file_time = filemtime( $file_path );

    // Enqueue the script with the correct URL and version
    wp_enqueue_script(
        'onlinechamp-plugin-js',                            // Handle for the script
        plugins_url( '/js/main.js', __FILE__ ),             // URL to the script file
        [ 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-data', 'wp-dom-ready' ], // Dependencies
        $file_time,                                         // Version based on file modification time
        true                                                // Load the script in the footer
    );

    // Add type="module" to script tag to load it as a single ES6 module
    wp_script_add_data( 'onlinechamp-plugin-js', 'type', 'module' );

    // Modify the script tag with the 'script_loader_tag' filter
    add_filter( 'script_loader_tag', function( $tag, $handle, $src ) {
        if ( $handle === 'onlinechamp-plugin-js' ) {
            // Ensure the type="module" is added to the script tag
            $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
        }
        return $tag;
    }, 10, 3 );

}

add_action( 'enqueue_block_editor_assets', 'insert_scripts' );

//Updates
if( ! function_exists( 'my_plugin_check_for_updates' ) ){
    
    function my_plugin_check_for_updates( $update, $plugin_data, $plugin_file ){
        
        static $response = false;
        
        if( empty( $plugin_data['UpdateURI'] ) || ! empty( $update ) )
            return $update;
        
        if( $response === false )
            $response = wp_remote_get( $plugin_data['UpdateURI'] );
        
        if( empty( $response['body'] ) )
            return $update;
        
        $custom_plugins_data = json_decode( $response['body'], true );
        
        if( ! empty( $custom_plugins_data[ $plugin_file ] ) )
            return $custom_plugins_data[ $plugin_file ];
        else
            return $update;
        
    }
    
    add_filter('update_plugins_raw.githubusercontent.com', 'my_plugin_check_for_updates', 10, 3);
    
}
