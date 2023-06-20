<?php

namespace Giantpeach\Blocks\Columns;

use Giantpeach\Blocks\Block;
use Giantpeach\Interfaces\Blocks\BlockInterface;

class Columns extends Block implements BlockInterface
{
  public static function getBlockName(): string
  {
    return 'giantpeach/columns';
  }

  public static function display(): void
  {
    $columns = new Columns();
    $columns->render();
  }
}
