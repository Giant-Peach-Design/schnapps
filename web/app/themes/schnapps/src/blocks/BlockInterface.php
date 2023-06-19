<?php

namespace Giantpeach\Blocks;

interface BlockInterface
{
  public function render();
  public static function registerBlock();
  public static function display();
}
