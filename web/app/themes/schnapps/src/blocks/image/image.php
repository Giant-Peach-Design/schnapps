<?php

namespace Giantpeach\Schnapps\Blocks\Image;

use Giantpeach\Blocks\Block;
use Giantpeach\Blocks\Interfaces\BlockInterface;

class Image extends Block implements BlockInterface
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

  public static function getBlockName(): string
  {
    return 'giantpeach/image';
  }

  public static function display(): void
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
