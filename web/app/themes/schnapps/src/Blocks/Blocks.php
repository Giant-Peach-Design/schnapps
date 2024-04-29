<?php

namespace Giantpeach\Schnapps\Theme\Blocks;

use Giantpeach\Schnapps\Blocks\Blocks as SchnappsBlocks;

use Giantpeach\Schnapps\Theme\Blocks\Header\Header;
use Giantpeach\Schnapps\Theme\Blocks\Footer\Footer;

use Giantpeach\Schnapps\Theme\Blocks\Banner\Banner;
use Giantpeach\Schnapps\Theme\Blocks\BannerSlide\BannerSlide;
use Giantpeach\Schnapps\Theme\Blocks\Button\Button;
use Giantpeach\Schnapps\Theme\Blocks\Card\Card;
use Giantpeach\Schnapps\Theme\Blocks\Column\Column;
use Giantpeach\Schnapps\Theme\Blocks\Columns\Columns;
use Giantpeach\Schnapps\Theme\Blocks\Hero\Hero;
use Giantpeach\Schnapps\Theme\Blocks\NewsRelated\NewsRelated;
use Giantpeach\Schnapps\Theme\Blocks\Media\Media;
use Giantpeach\Schnapps\Theme\Blocks\NewsList\NewsList;
use Giantpeach\Schnapps\Theme\Blocks\SocialLinks\SocialLinks;
use Giantpeach\Schnapps\Theme\Blocks\Testimonial\Testimonial;
use Giantpeach\Schnapps\Theme\Blocks\TestimonialSlider\TestimonialSlider;

use Giantpeach\Schnapps\Theme\Patterns\TitleLinkColumn;

/**
 * Blocks Class
 * 
 * This class is responsible for registering blocks and patterns.
 * 
 */
class Blocks extends SchnappsBlocks
{
  /**
   * Available blocks
   * Any blocks you create should be added to this array to be registered
   * (or you can register them manually in the registerBlocks method)
   * @var array
   */
  protected $blocks = [
    Header::class,
    Footer::class,
    Banner::class,
    BannerSlide::class,
    Hero::class,
    Media::class,
    Columns::class,
    Column::class,
    Button::class,
    Card::class,
    NewsList::class,
    NewsRelated::class,
    Testimonial::class,
    TestimonialSlider::class,
    SocialLinks::class
  ];

  public function __construct()
  {
    parent::__construct();

    add_action('init', [$this, 'registerBlocks']);
    add_action('init', [$this, 'registerPatterns']);
    add_action('acf/include_fields', [$this, 'registerFields']);

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
      'core/pattern',
      'core/shortcode',
      'giantpeach/column',
      'gravityforms/form',
      // 'core/embed',
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

  public function registerFields(): void
  {
    foreach ($this->blocks as $block) {
      $block::registerFields();
    }
  }
}
