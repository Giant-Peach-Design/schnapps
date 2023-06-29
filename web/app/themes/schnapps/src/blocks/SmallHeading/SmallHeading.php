<?php

namespace Giantpeach\Schnapps\Theme\Blocks\SmallHeading;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;

class SmallHeading extends Block implements BlockInterface
{

  public static string $blockName = 'giantpeach/small-heading';

  public $allowedBlocks = [
    'core/paragraph',
    'core/heading'
  ];

  public static function display(): void
  {
    $smallHeading = new SmallHeading();
    $smallHeading->render();
  }
}
