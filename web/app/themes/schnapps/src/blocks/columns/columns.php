<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Columns;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;

class Columns extends Block implements BlockInterface
{

  public static string $blockName = 'giantpeach/columns';

  public $allowedBlocks;
  public $justifyContent;
  public $alignItems;

  public function __construct($justifyContent = 'center', $alignItems = 'flex-start')
  {
    $this->allowedBlocks = [
      'giantpeach/column',
    ];

    $this->justifyContent = $justifyContent;
    $this->alignItems = $alignItems;

    parent::__construct();
  }

  public static function display(): void
  {
    $columns = new Columns('center', 'flex-start');
    $columns->render();
  }
}
