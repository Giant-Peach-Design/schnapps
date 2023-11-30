<?php

namespace Giantpeach\Schnapps\Theme;

use Giantpeach\Schnapps\Config\Facades\Config;
use Giantpeach\Schnapps\Theme\Blocks\Blocks;
use Giantpeach\Schnapps\Images\Images;
use Giantpeach\Schnapps\Navigation\Navigation;
use Giantpeach\Schnapps\Query\Cli\Cli as QueryCli;
use Giantpeach\Schnapps\Theme\Routes\Api;

class Schnapps
{

  public function __construct()
  {
    // Load Config Files
    Config::load();

    $this->setupTheme();
    $this->setupFilters();

    Images::getInstance();

    // Load Blocks
    new Blocks();

    // Load API Routes
    new Api();

    // Load CLI Commands
    new QueryCli();
  }

  public function setupTheme(): void
  {
    add_action('init', [$this, 'registerPostTypes']);
    add_action('init', [$this, 'registerMenus']);

    add_action('init', [$this, 'createThemeOptionsPage']);

    add_action('wp_enqueue_scripts', [$this, 'stylesheets']);
    add_action('wp_enqueue_scripts', [$this, 'scripts']);

    add_action('enqueue_block_editor_assets', [$this, 'blockEditorStylesheets']);
    add_action('enqueue_block_editor_assets', [$this, 'blockEditorScripts']);
  }

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
   * Create theme options page
   *
   * @return void
   */
  public function createThemeOptionsPage(): void
  {
    if (function_exists('acf_add_options_page')) {
      acf_add_options_page([
        'page_title' => 'Theme Options',
        'menu_title' => 'Theme Options',
        'menu_slug' => 'theme-options',
        'capability' => 'edit_posts',
        'redirect' => false,
      ]);
    }
  }

  public function setupFilters()
  {

    add_filter('acf/blocks/no_fields_assigned_message', function () {
      return 'This block contains no editable fields.';
    });

    add_filter('upload_mimes', function ($mimes) {
      $mimes['svg'] = 'image/svg+xml';
      return $mimes;
    });
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
