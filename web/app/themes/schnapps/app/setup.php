<?php

/**
 * Theme setup.
 */

namespace App;

use Illuminate\Support\Facades\Vite;

/**
 * Inject styles into the block editor.
 *
 * @return array
 */
add_filter('block_editor_settings_all', function ($settings) {
    $style = Vite::asset('resources/css/editor.css');

    $settings['styles'][] = [
        'css' => "@import url('{$style}')",
    ];

    return $settings;
});

/**
 * Inject scripts into the block editor.
 *
 * @return void
 */
add_filter('admin_head', function () {
    if (! get_current_screen()?->is_block_editor()) {
        return;
    }

    $dependencies = json_decode(Vite::content('editor.deps.json'));

    foreach ($dependencies as $dependency) {
        if (! wp_script_is($dependency)) {
            wp_enqueue_script($dependency);
        }
    }

    echo Vite::withEntryPoints([
        'resources/js/editor.js',
    ])->toHtml();
});

/**
 * Use the generated theme.json file.
 *
 * @return string
 */
add_filter('theme_file_path', function ($path, $file) {
    return $file === 'theme.json'
        ? public_path('build/assets/theme.json')
        : $path;
}, 10, 2);

/**
 * Allow SVG uploads in the media library.
 */
add_filter('upload_mimes', function ($mimes) {
    $mimes['svg'] = 'image/svg+xml';

    return $mimes;
});

add_filter('wp_check_filetype_and_ext', function ($data, $file, $filename) {
    if (str_ends_with($filename, '.svg')) {
        $data['ext'] = 'svg';
        $data['type'] = 'image/svg+xml';
    }

    return $data;
}, 10, 3);

/**
 * Disable Gravity Forms theme CSS and enable legacy (simpler) markup.
 */
add_filter('gform_disable_form_theme_css', '__return_true');
add_filter('gform_enable_legacy_markup', '__return_true');
add_filter('gform_disable_css', '__return_true');

/**
 * Strip Gravity Forms inline <style> blocks from form output.
 */
add_filter('gform_get_form_filter', function ($formString) {
    return preg_replace('/<style[^>]*>.*?<\/style>/s', '', $formString);
});

/**
 * Use <button> instead of <input> for Gravity Forms submit buttons.
 */
add_filter('gform_submit_button', function ($button, $form) {
    return '<button type="submit" class="gform_button button" id="gform_submit_button_' . $form['id'] . '">' . $form['button']['text'] . '</button>';
}, 10, 2);

/**
 * Populate ACF select fields named 'form' or 'newsletter_form' with Gravity Forms.
 */
$populateGravityForms = function ($field) {
    $field['choices'] = [];

    if (class_exists('GFAPI')) {
        foreach (\GFAPI::get_forms() as $form) {
            $field['choices'][$form['id']] = $form['title'];
        }
    }

    return $field;
};

add_filter('acf/load_field/name=form', $populateGravityForms);
add_filter('acf/load_field/name=newsletter_form', $populateGravityForms);

/**
 * Add custom style formats to TinyMCE (ACF WYSIWYG fields).
 * Add project-specific groups (e.g. flourishes, colours) as needed.
 */
add_filter('tiny_mce_before_init', function ($settings) {
    $style_formats = [
        [
            'title' => 'Heading Styles',
            'items' => [
                [
                    'title' => 'Heading 1',
                    'selector' => 'p,h1,h2,h3,h4,h5,h6,span',
                    'classes' => 'is-h1',
                ],
                [
                    'title' => 'Heading 2',
                    'selector' => 'p,h1,h2,h3,h4,h5,h6,span',
                    'classes' => 'is-h2',
                ],
                [
                    'title' => 'Heading 3',
                    'selector' => 'p,h1,h2,h3,h4,h5,h6,span',
                    'classes' => 'is-h3',
                ],
                [
                    'title' => 'Heading 4',
                    'selector' => 'p,h1,h2,h3,h4,h5,h6,span',
                    'classes' => 'is-h4',
                ],
                [
                    'title' => 'Heading 5',
                    'selector' => 'p,h1,h2,h3,h4,h5,h6,span',
                    'classes' => 'is-h5',
                ],
                [
                    'title' => 'Heading 6',
                    'selector' => 'p,h1,h2,h3,h4,h5,h6,span',
                    'classes' => 'is-h6',
                ],
            ],
        ],
    ];

    $settings['style_formats'] = wp_json_encode($style_formats);

    return $settings;
});

/**
 * Ensure the Formats dropdown is visible in the TinyMCE toolbar.
 */
add_filter('mce_buttons_2', function ($buttons) {
    if (! in_array('styleselect', $buttons)) {
        array_unshift($buttons, 'styleselect');
    }

    return $buttons;
});

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {
    /**
     * Disable full-site editing support.
     *
     * @link https://wptavern.com/gutenberg-10-5-embeds-pdfs-adds-verse-block-color-options-and-introduces-new-patterns
     */
    remove_theme_support('block-templates');

    /**
     * Register the navigation menus.
     *
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage'),
    ]);

    /**
     * Disable the default block patterns.
     *
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-the-default-block-patterns
     */
    remove_theme_support('core-block-patterns');

    /**
     * Enable plugins to manage the document title.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Enable post thumbnail support.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable responsive embed support.
     *
     * @link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#responsive-embedded-content
     */
    add_theme_support('responsive-embeds');

    /**
     * Enable HTML5 markup support.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', [
        'caption',
        'comment-form',
        'comment-list',
        'gallery',
        'search-form',
        'script',
        'style',
    ]);

    /**
     * Enable selective refresh for widgets in customizer.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#customize-selective-refresh-widgets
     */
    add_theme_support('customize-selective-refresh-widgets');
}, 20);
