<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Slide;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;

class Slide extends Block implements BlockInterface
{

  public function __construct()
  {
    parent::__construct();
  }

  public static function getBlockName(): string
  {
    return 'giantpeach/slide';
  }

  public static function display(): void
  {
    $slide = new Slide();
    $slide->render();
  }
}
