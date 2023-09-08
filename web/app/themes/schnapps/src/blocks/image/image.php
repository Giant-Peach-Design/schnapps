<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Image;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Images\Images;
use Giantpeach\Schnapps\Images\Facades\Images as ImageFacade;

// TODO: refactor this to use the new Images getImages function

class Image extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/image';
  public $image = [
    'desktop' => [
      'url' => null,
      'alt' => '',
      'width' => '',
      'height' => '',
      'webp' => ''
    ],
    'tablet' => [
      'url' => null,
      'alt' => '',
      'width' => '',
      'height' => '',
      'webp' => ''
    ],
    'mobile' => [
      'url' => null,
      'alt' => '',
      'width' => '',
      'height' => '',
      'webp' => ''
    ]
  ];

  public function __construct($image)
  {
    $this->image = $image;

    parent::__construct();
  }

  public static function generateSingleImageArray(array|null|bool $imgField, string $size = '')
  {
    if (!$imgField) return null;

    $width = $imgField['width'];
    $height = $imgField['height'];

    if ($size) {
      $size = $size . '_';
      $width = get_field($size . 'width');
      $height = get_field($size . 'height');
    }

    if ($size === '') {
      $width = get_field('width');
      $height = get_field('height');
    }

    return ImageFacade::getImage($imgField['id'], [
      'w' => $width,
      'h' => $height,
      'fit' => 'crop',
    ]);
  }

  public static function generateImageArray()
  {
    $desktopImage = self::generateSingleImageArray(get_field('image'));
    $mobileImage = self::generateSingleImageArray(get_field('mobile_image'), 'mobile');
    $tabletImage = self::generateSingleImageArray(get_field('desktop_image'), 'tablet');

    $imgArray = [
      'desktop' => [
        'url' => null,
        'alt' => '',
        'width' => '',
        'height' => '',
        'webp' => ''
      ],
      'tablet' => [
        'url' => null,
        'alt' => '',
        'width' => '',
        'height' => '',
        'webp' => ''
      ],
      'mobile' => [
        'url' => null,
        'alt' => '',
        'width' => '',
        'height' => '',
        'webp' => ''
      ]
    ];

    if ($desktopImage) {
      $imgArray['desktop'] = $desktopImage;
    }

    if ($mobileImage) {
      $imgArray['mobile'] = $mobileImage;
    }

    if (get_field('different_on_tablet') === true) {
      if ($tabletImage) {
        $imgArray['tablet'] = $tabletImage;
      } else {
        $imgArray['tablet'] = $desktopImage;
      }
    }



    if (get_field('different_on_mobile') === true) {
      if (get_field('mobile_image')) {
        $imgArray['mobile'] = $mobileImage;
      } else {
        $imgArray['mobile'] = self::generateSingleImageArray(get_field('image'), 'mobile');
      }
    }

    return $imgArray;
  }

  public static function display(): void
  {

    $imgArray = self::generateImageArray();

    $image = new Image(
      $imgArray
    );

    $image->render();
  }
}
