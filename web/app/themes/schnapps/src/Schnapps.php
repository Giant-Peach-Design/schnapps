<?php

namespace Giantpeach\Schnapps\Theme;

use Giantpeach\Schnapps\Blocks\Blocks;
use Giantpeach\Schnapps\Navigation\Navigation;
use Giantpeach\Schnapps\Theme\Blocks\Banner\Banner;
use Giantpeach\Schnapps\Theme\Blocks\Button\Button;
use Giantpeach\Schnapps\Theme\Blocks\Columns\Columns;
use Giantpeach\Schnapps\Theme\Blocks\HeaderNavigation\HeaderNavigation;
use Giantpeach\Schnapps\Theme\Blocks\Image\Image;
use Giantpeach\Schnapps\Theme\Blocks\Logo\Logo;

class Schnapps
{

  protected $blocks = [
    Banner::class,
    Image::class,
    Columns::class,
    Button::class,
    Logo::class,
    HeaderNavigation::class,
  ];

  public function __construct()
  {
    $this->setupTheme();
    $this->setupFilters();

    new Blocks();
  }

  public function setupTheme()
  {
    add_action('init', [$this, 'registerBlocks']);
    add_action('init', [$this, 'registerMenus']);
    add_action('wp_enqueue_scripts', [$this, 'stylesheets']);
    add_action('wp_enqueue_scripts', [$this, 'scripts']);
    add_action('enqueue_block_editor_assets', [$this, 'blockEditorStylesheets']);
  }

  public function registerBlocks()
  {
    //register_block_type(get_template_directory() . '/src/blocks/card');
    register_block_type(get_template_directory() . '/build/Blocks/Column');

    foreach ($this->blocks as $block) {
      $block::registerBlock();
    }
  }

  public function registerMenus()
  {
    Navigation::registerNav('primary');
  }

  public function setupFilters()
  {
    add_filter('allowed_block_types_all', [$this, 'allowedBlockTypes'], 25, 2);

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

  public function scripts()
  {
    wp_enqueue_script('schnapps', get_template_directory_uri() . '/dist/main.js', array(), null, true);
  }

  public function blockEditorStylesheets()
  {
    wp_enqueue_style('schnapps-editor', get_template_directory_uri() . '/dist/main.css', false, null);
  }

  public function allowedBlockTypes($allowed_blocks, $editor_context)
  {

    // TODO: Move this to giantpeach/blocks package, autoload if block.json file exists

    $registeredCustomBlocks = [];

    foreach ($this->blocks as $block) {
      $registeredCustomBlocks[] = $block::getBlockName();
    }

    return array_merge([
      'core/paragraph',
      'core/heading',
      'core/list',
      'core/list-item',
      'core/block',
      'giantpeach/column'
    ], $registeredCustomBlocks);
  }
}
