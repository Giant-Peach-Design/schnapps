<?php

namespace Giantpeach\Schnapps\Theme;

use Giantpeach\Schnapps\Framework\SchnappsFramework;
use Giantpeach\Schnapps\Navigation\Navigation;

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

    //e.g. add_action('init', [$this, 'thingToRunOnInit']);
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
  }

  /**
   * Register menus
   *
   * @return void
   */
  public function registerMenus(): void
  {
    Navigation::registerNav('primary');
    Navigation::registerNav('footer');
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
    wp_enqueue_style('schnapps', get_template_directory_uri() . '/dist/main.css', false, null);
  }

  public function scripts(): void
  {
    wp_enqueue_script('schnapps', get_template_directory_uri() . '/dist/main.js', array(), null, true);
    wp_enqueue_script('fontawesome', "https://kit.fontawesome.com/c91deddf7e.js", array(), false, true);
  }

  public function blockEditorStylesheets(): void
  {
    wp_enqueue_style('schnapps-editor', get_template_directory_uri() . '/dist/main.css', false, null);
    wp_enqueue_style('schnapps-editor-specific', get_template_directory_uri() . '/dist/editor.css', false, null);
  }

  public function blockEditorScripts(): void
  {
    wp_enqueue_script(
      'schnapps-editor',
      get_template_directory_uri() . '/dist/editor.js',
      ['wp-blocks'],
      filemtime(get_template_directory() . '/dist/editor.js'),
      true
    );
  }
}
