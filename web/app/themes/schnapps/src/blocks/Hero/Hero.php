<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Hero;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Images\Images;

class Hero extends Block implements BlockInterface
{

  public $image;
  public $webp;
  public $mobile;
  public $mobileWebp;
  public $alt;

  public function __construct($image, $webp, $mobile, $mobileWebp, $alt)
  {
    $this->image = $image;
    $this->webp = $webp;
    $this->mobile = $mobile;
    $this->mobileWebp = $mobileWebp;
    $this->alt = $alt;

    parent::__construct();
  }

  public static function getBlockName(): string
  {
    return 'giantpeach/hero';
  }

  public static function display(): void
  {
    $imgField = get_field('image');
    $mobImgField = get_field('mobile_image');

    if ($imgField) {

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
    }

    if ($mobImgField) {

      $mobImgUrl = Images::getInstance()->getGlideImageUrl($mobImgField['ID'], [
        'w' => 375,
        'h' => $mobImgField['height'],
        'fit' => 'crop',
      ]);

      $mobWebp = Images::getInstance()->getGlideImageUrl($mobImgField['ID'], [
        'w' => 375,
        'h' => $mobImgField['height'],
        'fit' => 'crop',
        'fm' => 'webp',
      ]);
    }

    $hero = new Hero(
      $imgUrl ?? null,
      $webp ?? null,
      $mobImgUrl ?? null,
      $mobWebp ?? null,
      $imgField['alt'] ?? null
    );
    $hero->render();
  }
}
