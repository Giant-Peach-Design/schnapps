<?php

namespace Giantpeach\Schnapps\Theme\Blocks\BannerSlide;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Images\Facades\Images;

class BannerSlide extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/bannerslide';

  public array $allowedBlocks = [
    'core/paragraph',
    'core/heading',
    'giantpeach/button'
  ];

  public array $template = [
    ['core/heading', ['level' => 2, 'placeholder' => 'Slide heading (optional)']],
    ['core/paragraph', ['placeholder' => 'During the strategic definition stage, the client’s business case and strategic brief are assessed to ensure they have been properly considered’ and the scope of the project is defined. This stage is not about design or the practical details.', 'className' => '']],
  ];


  public $image;
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

    $slide = new BannerSlide(
      imageId: $imgField['ID'] ?? -1,
      mobileImageId: $mobImgField['ID'] ?? -1,
    );

    $slide->render();
  }
}
