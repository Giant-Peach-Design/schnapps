<?php

namespace Giantpeach\Blocks\Image;

use Giantpeach\Blocks\BlockInterface;

class Image implements BlockInterface
{
  public $url;
  public $alt;
  public $width;
  public $height;

  public function __construct($url, $alt, $width, $height)
  {
    $this->url = $url ?? null;
    $this->alt = $alt ?? '';
    $this->width = $width;
    $this->height = $height;
  }

  public function render()
  {
    include 'template.php';
  }

  public static function getBlockName()
  {
    return 'giantpeach/image';
  }

  public static function registerBlock()
  {
    register_block_type(__DIR__ . '/block.json');
  }

  public static function display()
  {
    $image = new Image(
      get_field('image')['url'],
      get_field('image')['alt'],
      get_field('image')['width'],
      get_field('image')['height']
    );
    $image->render();
  }
}
