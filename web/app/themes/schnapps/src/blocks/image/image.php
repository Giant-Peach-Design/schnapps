<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Image;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Images\Images;

class Image extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/image';
  public $url;
  public $alt;
  public $width;
  public $height;

  public $image;
  public $webp;
  public $mobile;

  public function __construct($url, $alt, $width, $height, $webp = null, $mobile = null)
  {
    $this->url = $url ?? null;
    $this->alt = $alt ?? '';
    $this->width = $width;
    $this->height = $height;
    $this->webp = $webp;
    $this->mobile = $mobile;
  }

  public static function display(): void
  {
    $imgField = get_field('image');

    $imgUrl = Images::getInstance()->getGlideImageUrl($imgField['ID'], [
      'w' => $imgField['width'],
      'h' => $imgField['height'],
      'fit' => 'crop',
    ]);

    $webp = Images::getInstance()->getGlideImageUrl($imgField['ID'], [
      'w' => $imgField['width'],
      'h' => $imgField['height'],
      'fit' => 'crop',
      'fm' => 'webp',
    ]);

    $image = new Image(
      $imgUrl,
      get_field('image')['alt'],
      get_field('image')['width'],
      get_field('image')['height'],
      $webp
    );
    $image->render();
  }
}
