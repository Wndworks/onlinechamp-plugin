<?php

function insert_scripts() {

    // Get the file path for 'js/main.js' in the plugin
    $file_path = PLUGIN_PATH . '../assets/js/main.js';

    if ( file_exists( $file_path ) ) {
        // Get the last modified time of the file to use as the version
        $file_time = filemtime( $file_path );
    } else {
        $file_time = time(); // Fallback to current time if the file is not found
    }

    // Enqueue the script with the correct URL and version
    wp_enqueue_script(
        'onlinechamp-plugin-js',                            // Handle for the script
        PLUGIN_URL . 'assets/js/main.js',           // URL to the script file
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