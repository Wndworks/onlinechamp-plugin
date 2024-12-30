<?php

//Styling inserterd in the editor
function add_editor_styles() {
    wp_enqueue_style(
        'plugin-editor-styles',
        (PLUGIN_URL . 'dist/wp-editor.css'),
        [],
        '1.0.0'
    );
}

add_action( 'enqueue_block_editor_assets', 'add_editor_styles' );

//Stylinh inserted in the admin head
function add_wp_styles() {

    $file_path = PLUGIN_PATH . 'dist/wp-admin.css';

    if (file_exists($file_path)) {

        $css_content = file_get_contents($file_path);

    } else {
        error_log('editor.css niet gevonden: ' . $file_path);
        $css_content = '//Onlinechamp plugin output';
    }

    echo '<style>' . $css_content . '</style>';

}

add_action( 'admin_head', 'add_wp_styles' );