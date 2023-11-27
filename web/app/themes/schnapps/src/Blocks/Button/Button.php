<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Button;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;


class Button extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/button';
  public $text;
  public $url;
  public $target;
  public $rel;
  public $size;

  public function __construct($text, $url, $target, $rel, $size)
  {
    $this->text = $text;
    $this->url = $url;
    $this->target = $target;
    $this->rel = $rel;
    $this->size = $size;
  }

  public static function display(): void
  {
    $button = new Button(
      get_field('text'),
      get_field('url'),
      get_field('target'),
      get_field('rel'),
      get_field('size'),
    );
    $button->render();
  }
}
