<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Banner;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;

class Banner extends Block implements BlockInterface
{
  public array $slides;

  public function __construct($slides)
  {
    $this->slides = $slides;
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
