<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Columns;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;

class Columns extends Block implements BlockInterface
{
  public $allowedBlocks;

  public function __construct()
  {
    $this->allowedBlocks = [
      'giantpeach/column',
    ];
  }

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
