<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Card;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Compatability\Block as CompatabilityBlock;

class Card extends CompatabilityBlock
{
  public static string $blockName = "giantpeach/card";

  public static function display(): void
  {
    $card = new Card();
    $card->render();
  }
}
