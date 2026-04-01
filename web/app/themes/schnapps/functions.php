<?php

use Roots\Acorn\Application;

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our theme. We will simply require it into the script here so that we
| don't have to worry about manually loading any of our classes later on.
|
*/

if (! file_exists($composer = __DIR__.'/vendor/autoload.php')) {
    wp_die(__('Error locating autoloader. Please run <code>composer install</code>.', 'sage'));
}

require $composer;

/*
|--------------------------------------------------------------------------
| Register The Bootloader
|--------------------------------------------------------------------------
|
| The first thing we will do is schedule a new Acorn application container
| to boot when WordPress is finished loading the theme. The application
| serves as the "glue" for all the components of Laravel and is
| the IoC container for the system binding all of the various parts.
|
*/

Application::configure()
    ->withProviders([
        App\Providers\ThemeServiceProvider::class,
    ])
    ->boot();

/*
|--------------------------------------------------------------------------
| Register Sage Theme Files
|--------------------------------------------------------------------------
|
| Out of the box, Sage ships with categorically named theme files
| containing common functionality and setup to be bootstrapped with your
| theme. Simply add (or remove) files from the array below to change what
| is registered alongside Sage.
|
*/

collect(['setup', 'filters'])
    ->each(function ($file) {
        if (! locate_template($file = "app/{$file}.php", true, true)) {
            wp_die(
                /* translators: %s is replaced with the relative file path */
                sprintf(__('Error locating <code>%s</code> for inclusion.', 'sage'), $file)
            );
        }
    });



        function custom_menu_order($menu_ord) {
            if (!$menu_ord) return true;
            return array(
                'index.php',                  // Dashboard
                'edit.php?post_type=page',   // Pages
                'edit.php',                   // Posts
                'upload.php',                 // Media
                'gf_edit_forms',             // Gravity Forms
                'theme-options',             // Theme Options
                'woocommerce',               // WooCommerce (if active)
                'themes.php',                // Appearance
                'plugins.php',               // Plugins
                'users.php',                 // Users
                'tools.php',                 // Tools
                'options-general.php' ,       // Settings
                'edit-comments.php',         // Comments
            );
        }
        add_filter('custom_menu_order', '__return_true');
        add_filter('menu_order', 'custom_menu_order');

        /* make gravity forms available to Editor role */

        function add_gf_cap()
        {
            $role = get_role( 'editor' );
            $role->add_cap( 'gform_full_access' );
        }
         add_action( 'admin_init', 'add_gf_cap' );
