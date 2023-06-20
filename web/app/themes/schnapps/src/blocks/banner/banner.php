<?php

namespace Giantpeach\Blocks\Banner;

use Giantpeach\Blocks\Block;
use Giantpeach\Interfaces\Blocks\BlockInterface;


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
