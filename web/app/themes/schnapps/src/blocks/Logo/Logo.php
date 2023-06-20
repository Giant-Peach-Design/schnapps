<?php

namespace Giantpeach\Blocks\Logo;

use Giantpeach\Blocks\BlockInterface;

class Logo implements BlockInterface
{
  public function render()
  {
    include 'template.php';
  }

  public static function getBlockName()
  {
    return 'giantpeach/logo';
  }

  public static function registerBlock()
  {
    register_block_type(__DIR__ . '/block.json');
  }

  public static function display()
  {
    $logo = new Logo();
    $logo->render();
  }
}
