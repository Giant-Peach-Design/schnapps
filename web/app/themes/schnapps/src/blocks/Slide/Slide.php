<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Slide;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Images\Images;

class Slide extends Block implements BlockInterface
{
  public array $allowedBlocks;
  public $image;
  public $webp;
  public $mobile;
  public $alt;

  public function __construct($image, $alt, $webp = null, $mobile = null)
  {
    $this->image = $image;
    $this->alt = $alt;
    $this->webp = $webp;
    $this->mobile = $mobile;

    $this->allowedBlocks = [
      'giantpeach/columns',
      'core/paragraph',
      'core/heading',
      'core/list',
      'giantpeach/button'
    ];

    parent::__construct();
  }

  public static function getBlockName(): string
  {
    return 'giantpeach/slide';
  }

  public static function display(): void
  {
    $imgField = get_field('image');

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

    $slide = new Slide(
      $imgUrl ?? null,
      $imgField['alt'] ?? null,
      $webp ?? null,
      get_field('mobile')['url'] ?? null
    );

    $slide->render();
  }
}
