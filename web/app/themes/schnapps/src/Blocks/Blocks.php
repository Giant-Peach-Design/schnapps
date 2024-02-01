<?php

namespace Giantpeach\Schnapps\Theme\Blocks;

use Giantpeach\Schnapps\Blocks\Blocks as SchnappsBlocks;

use Giantpeach\Schnapps\Theme\Blocks\Banner\Banner;
use Giantpeach\Schnapps\Theme\Blocks\Button\Button;
use Giantpeach\Schnapps\Theme\Blocks\Card\Card;
use Giantpeach\Schnapps\Theme\Blocks\Column\Column;
use Giantpeach\Schnapps\Theme\Blocks\Columns\Columns;
use Giantpeach\Schnapps\Theme\Blocks\HeaderNavigation\HeaderNavigation;
use Giantpeach\Schnapps\Theme\Blocks\Hero\Hero;
use Giantpeach\Schnapps\Theme\Blocks\LatestNews\LatestNews;
use Giantpeach\Schnapps\Theme\Blocks\Logo\Logo;
use Giantpeach\Schnapps\Theme\Blocks\Media\Media;
use Giantpeach\Schnapps\Theme\Blocks\NewsList\NewsList;
use Giantpeach\Schnapps\Theme\Blocks\Slide\Slide;
use Giantpeach\Schnapps\Theme\Patterns\TitleLinkColumn;

/**
 * Blocks Class
 * 
 * This class is responsible for registering blocks and patterns.
 * 
 */
class Blocks
{
  /**
   * Available blocks
   * Any blocks you create should be added to this array to be registered
   * (or you can register them manually in the registerBlocks method)
   * @var array
   */
  protected $blocks = [
    Banner::class,
    Hero::class,
    Slide::class,
    Media::class,
    Columns::class,
    Column::class,
    Button::class,
    Logo::class,
    Card::class,
    HeaderNavigation::class,
    LatestNews::class,
    NewsList::class,
  ];

  public function __construct()
  {
    new SchnappsBlocks();

    add_action('init', [$this, 'registerBlocks']);
    add_action('init', [$this, 'registerPatterns']);

    add_filter('allowed_block_types_all', [$this, 'allowedBlockTypes'], 25, 2);
  }

  public function allowedBlockTypes($allowed_blocks, $editor_context): array
  {

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
      'core/html',
      'giantpeach/columns',
      'gravityforms/form',
      'core/embed',
      'core/table',
    ], $registeredCustomBlocks);
  }

  public function registerBlocks(): void
  {
    foreach ($this->blocks as $block) {
      $block::registerBlock();
    }
  }

  /**
   * Register patterns
   *
   * @return void
   */
  public function registerPatterns(): void
  {
    register_block_pattern_category('giantpeach', [
      'label' => 'Giant Peach',
    ]);

    TitleLinkColumn::init();
  }
}
