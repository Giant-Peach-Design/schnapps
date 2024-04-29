<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Button;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;


class Button extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/button';
  
  public $link;
  public $rel;
  public $btn_style;
  public $position;

  public function __construct($link, $rel, $btnStyle, $position)
  {
    $this->link = $link ? $link : null;
    $this->rel = $rel;
    $this->btn_style = $btnStyle;
    $this->position = $position;

    parent::__construct();
  }

  public static function display(): void
  {
    $button = new Button(
      link: get_field('link'),
      rel: get_field('rel'),
      btnStyle: get_field('btn_style'),
      position: get_field('position')
    );
    $button->render();
  }
}
