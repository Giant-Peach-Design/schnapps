<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Card;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;

class Card extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/card';

  public static function display(): void
  {
    $card = new Card();
    $card->render();
  }
}
