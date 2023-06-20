<?php

namespace Giantpeach\Blocks\Columns;

use Giantpeach\Blocks\BlockInterface;

class Columns implements BlockInterface
{
  public function render()
  {
    include 'template.php';
  }

  public static function getBlockName()
  {
    return 'giantpeach/columns';
  }

  public static function registerBlock()
  {
    register_block_type(__DIR__ . '/block.json');
  }

  public static function display()
  {
    $columns = new Columns();
    $columns->render();
  }
}
