<?php

namespace Giantpeach\Schnapps\Theme;

use Giantpeach\Schnapps\Framework\SchnappsFramework;
use Giantpeach\Schnapps\Navigation\Navigation;
use Giantpeach\Schnapps\Theme\PostTypes\Post;

class Schnapps extends SchnappsFramework
{
  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Sets up the theme.
   *
   * This method is called to initialize the theme and perform any necessary setup tasks.
   * It extends the parent setupTheme() method and can be used to add custom actions.
   * The parent class will call the following methods automatically:
   * - registerPostTypes()
   * - registerMenus()
   * - stylesheets()
   * - scripts()
   * - blockEditorStylesheets()
   * - blockEditorScripts()
   *
   * @return void
   */
  public function setupTheme(): void
  {
    parent::setupTheme();

    add_theme_support( 'custom-spacing' );
    remove_theme_support( 'core-block-patterns' );

    add_action( 'after_setup_theme', function() {
      $themeColours = $this->getThemeColours();

      add_theme_support( 'editor-color-palette', $themeColours);
      add_theme_support( 'disable-custom-colors' );
      remove_theme_support( 'core-block-patterns' );
      add_theme_support( 'custom-spacing' );
    });

    //e.g. add_action('init', [$this, 'thingToRunOnInit']);
  }

  /**
   * Sets up the colours used in WP Editor.
   *
   * @return array
   */
  public function getThemeColours(): array
  {
    return [
        [
            'name' => esc_attr__('Light', 'giantpeach'),
            'slug' => 'light',
            'color' => '#FBF4ED',
        ],
        [
            'name' => esc_attr__('Dark Grey', 'giantpeach'),
            'slug' => 'darkgrey',
            'color' => '#202831',
        ],
        [
            'name' => esc_attr__('Blue', 'giantpeach'),
            'slug' => 'blue',
            'color' => '#3F82BC',
        ]
    ];
  }

  /**
   * Registers custom post types.
   *
   * @return void
   */
  public function registerPostTypes(): void
  {
    // Register custom post types here
    //new Work();
    new Post();
  }

  /**
   * Register menus
   *
   * @return void
   */
  public function registerMenus(): void
  {
    Navigation::registerNav("primary");
    Navigation::registerNav("footer");
  }

  /**
   * Set up the filters for the Schnapps class.
   *
   * This method extends the parent class's setupFilters method.
   * It can be used to add custom filters.
   * The parent class will call the following methods automatically:
   * - acf/blocks/no_fields_assigned_message
   * - upload_mimes
   * - acf/load_field/name=post_type
   * - acf/load_field/name=taxonomy
   * - acf/load_field/name=image_sizes
   *
   */
  public function setupFilters(): void
  {
    parent::setupFilters();
  }

  public function stylesheets()
  {
    wp_enqueue_style(
      handle: "schnapps",
      src: get_template_directory_uri() . "/dist/main.css",
      deps: false,
      ver: null,
    );
  }

  public function scripts(): void
  {
    wp_enqueue_script(
      handle: "schnapps",
      src: get_template_directory_uri() . "/dist/main.js",
      deps: [],
      ver: null,
      args: true,
    );
    wp_enqueue_script(
      handle: "fontawesome",
      src: "https://kit.fontawesome.com/c91deddf7e.js",
      deps: [],
      ver: false,
      args: [
        "crossorigin" => "anonymous",
        "strategy" => "defer",
      ],
    );
  }

  public function blockEditorStylesheets(): void
  {
    wp_enqueue_style(
      handle: "schnapps-editor",
      src: get_template_directory_uri() . "/dist/main.css",
      deps: false,
      ver: null,
    );
    wp_enqueue_style(
      handle: "schnapps-editor-specific",
      src: get_template_directory_uri() . "/dist/editor.css",
      deps: false,
      ver: null,
    );
  }

  public function blockEditorScripts(): void
  {
    $asset_file_path = get_parent_theme_file_path('/dist/editor/editor.asset.php');

    if ( file_exists( $asset_file_path ) ) {
      $assets = require_once $asset_file_path;

      wp_enqueue_script(
        handle: "schnapps-editor",
        src: get_template_directory_uri() . "/dist/editor/editor.js",
        deps: $assets['dependencies'],
        ver: $assets['version'],
        args: true,
      );
    }

    wp_enqueue_script(
      handle: "fontawesome",
      src: "https://kit.fontawesome.com/c91deddf7e.js",
      deps: [],
      ver: false,
      args: [
        "crossorigin" => "anonymous",
        "strategy" => "defer",
      ],
    );
  }
}
