<?php

namespace Giantpeach;

class Schnapps
{

  public function __construct()
  {
    $this->setupTheme();
    $this->setupFilters();
  }

  public function setupTheme()
  {
    add_action('init', [$this, 'registerBlocks']);
    add_action('wp_enqueue_scripts', [$this, 'stylesheets']);
    add_action('wp_enqueue_scripts', [$this, 'scripts']);
    add_action('enqueue_block_editor_assets', [$this, 'blockEditorStylesheets']);
  }

  public function registerBlocks()
  {
    register_block_type(get_template_directory() . '/blocks/banner');
    register_block_type(get_template_directory() . '/blocks/columns');
    register_block_type(get_template_directory() . '/blocks/columns/column');
  }

  public function setupFilters()
  {
    //add_filter('allowed_block_types_all', [$this, 'allowedBlockTypes'], 25, 2);
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
    return array(
      'core/image',
      'core/paragraph',
      'core/heading',
      'core/list',
      'core/list-item',
      'core/columns',
      'acf/banner',
      'acf/columns',
      'acf/column'
    );
  }
}
