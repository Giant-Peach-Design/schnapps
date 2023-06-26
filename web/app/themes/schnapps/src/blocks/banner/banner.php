<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Banner;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;

class Banner extends Block implements BlockInterface
{
  public array $slides;
  public array $allowedBlocks;

  public function __construct($slides = [])
  {
    if (!$slides) {
      $slides = [];
    }
    $this->allowedBlocks = [
      'giantpeach/slide',
    ];
    $this->slides = $slides;

    parent::__construct();
  }

  public static function getBlockName(): string
  {
    return 'giantpeach/banner';
  }

  public static function display(): void
  {
    $banner = new Banner(get_field('slides'));
    $banner->render();
  }
}
