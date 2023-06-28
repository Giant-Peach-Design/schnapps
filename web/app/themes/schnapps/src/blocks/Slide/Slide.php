<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Slide;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Images\Images;

class Slide extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/slide';

  public array $allowedBlocks;
  public string $proseColor;
  public $image;
  public $webp;
  public $mobile;
  public $mobileWebp;
  public $alt;


  public function __construct($image, $alt, $webp = null, $mobile = null, $mobileWebp = null)
  {
    $this->image = $image;
    $this->alt = $alt;
    $this->webp = $webp;
    $this->mobile = $mobile;
    $this->mobileWebp = $mobileWebp;

    $this->allowedBlocks = [
      'giantpeach/columns',
      'core/paragraph',
      'core/heading',
      'core/list',
      'giantpeach/button'
    ];

    parent::__construct();
  }

  public static function display(): void
  {
    $imgField = get_field('image');
    $mobileImgField = get_field('mobile');

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

    if ($mobileImgField) {

      $mobileImgUrl = Images::getInstance()->getGlideImageUrl($mobileImgField['ID'], [
        'w' => 375,
        'h' => $mobileImgField['height'],
        'fit' => 'crop',
      ]);

      $mobileWebp = Images::getInstance()->getGlideImageUrl($mobileImgField['ID'], [
        'w' => 375,
        'h' => $mobileImgField['height'],
        'fit' => 'crop',
        'fm' => 'webp',
      ]);
    }

    $slide = new Slide(
      $imgUrl ?? null,
      $imgField['alt'] ?? null,
      $webp ?? null,
      $mobileImgUrl ?? null,
      $mobileWebp ?? null,
    );

    $slide->render();
  }
}
