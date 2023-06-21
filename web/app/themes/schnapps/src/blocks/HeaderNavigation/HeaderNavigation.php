<?php

namespace Giantpeach\Schnapps\Theme\Blocks\HeaderNavigation;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Navigation\Navigation;

class HeaderNavigation extends Block implements BlockInterface
{

  public $nav;

  public function __construct()
  {
    $this->nav = Navigation::buildNav(Navigation::getNav('primary'));
  }

  public static function getBlockName(): string
  {
    return 'giantpeach/headernavigation';
  }

  public static function display(): void
  {
    $headerNavigation = new HeaderNavigation();
    $headerNavigation->render();
  }
}
