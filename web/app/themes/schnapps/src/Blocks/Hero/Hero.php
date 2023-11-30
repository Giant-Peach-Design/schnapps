<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Hero;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Images\Facades\Images;

class Hero extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/hero';

  public $image;
  public $webp;
  public $mobile;
  public $mobileWebp;
  public $alt;

  public function __construct($imageId, $mobileImageId)
  {
    $this->image = Images::get(image: $imageId, mobileImage: $mobileImageId, imageSize: 'banner');

    parent::__construct();
  }

  public static function display(): void
  {
    $imgField = get_field('image');
    $mobImgField = get_field('mobile_image');

    $hero = new Hero(
      imageId: $imgField['ID'] ?? -1,
      mobileImageId: $mobImgField['ID'] ?? -1,
    );
    $hero->render();
  }
}
