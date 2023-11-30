<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Slide;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Images\Facades\Images;

class Slide extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/slide';

  public array $allowedBlocks = [
    'giantpeach/columns',
    'core/paragraph',
    'core/heading',
    'core/list',
    'giantpeach/button',
    'giantpeach/small-heading'
  ];
  public string $proseColor;
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
    $mobileImgField = get_field('mobile');

    $slide = new Slide(
      imageId: $imgField['ID'] ?? -1,
      mobileImageId: $mobImgField['ID'] ?? -1,
    );

    $slide->render();
  }
}
