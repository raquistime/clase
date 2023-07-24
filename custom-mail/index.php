<?php
/*
 * Plugin Name: Custom Mail
 * Description: Send Emails
 * Version: 1.0.0
 * Author: Automatic
 * Text Domain: custom-mail
 * Requires at least: 6.0
 * Requires PHP: 7.3
 */
add_action('admin_menu','add_mail_menu');
function add_mail_menu(){
    add_menu_page(
        'Custom Mail',
        'Custom Mail',
        'manage_options',
        'custom-mail',
        'menu_page',
    );
}

function menu_page(){
    load_template(__DIR__ . '/templates/main_menu.php')
    
}
