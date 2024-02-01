<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Columns;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;

class Columns extends Block implements BlockInterface
{

  public static string $blockName = 'giantpeach/columns';

  public static function registerBlock(): void
  {
    $resp = register_block_type(get_template_directory() . "/build/Blocks/Columns");
  }
}
