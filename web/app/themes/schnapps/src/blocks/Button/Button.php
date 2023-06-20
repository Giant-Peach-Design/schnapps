<?php

namespace Giantpeach\Blocks\Button;

use Giantpeach\Blocks\BlockInterface;

class Button implements BlockInterface
{
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

  public function render()
  {
    include 'template.php';
  }

  public static function getBlockName()
  {
    return 'giantpeach/button';
  }

  public static function registerBlock()
  {
    register_block_type(__DIR__ . '/block.json');
  }

  public static function display()
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
