<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Banner;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;

class Banner extends Block implements BlockInterface
{
  public array $allowedBlocks;

  public function __construct()
  {
    $this->allowedBlocks = [
      'giantpeach/slide',
    ];

    parent::__construct();
  }

  public static function getBlockName(): string
  {
    return 'giantpeach/banner';
  }

  public static function display(): void
  {
    $banner = new Banner();
    $banner->render();
  }
}
