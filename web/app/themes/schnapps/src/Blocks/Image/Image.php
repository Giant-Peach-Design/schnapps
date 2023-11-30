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
  public bool $rounded = true;
  public string $templatePath = 'src/Components/image.twig';

  public function __construct($imageId = -1, $mobileImageId = -1, $imageSize = 'full')
  {
    $this->image = ImageFacade::get(
      image: $imageId,
      mobileImage: $mobileImageId,
      imageSize: $imageSize
    );
    $this->rounded = get_field('rounded') ?? true;

    $tmplPath = get_field('template_path') ?? 'default';

    switch ($tmplPath) {
      case 'alt':
        $this->templatePath = "src/Components/image-alt.twig";
        break;

      default:
        $this->templatePath = "src/Components/image.twig";
        break;
    }

    parent::__construct();
  }

  public static function display($block = [], $content = "", $is_preview = false, $postId = 0, $context = []): void
  {
    $imageId = get_field('image')['id'] ?? -1;
    $mobileImageId = get_field('mobile_image')['id'] ?? -1;
    $imageSize = get_field('image_sizes') ?? 'full';

    $image = new Image(
      imageId: $imageId,
      mobileImageId: $mobileImageId,
      imageSize: $imageSize
    );

    $image->render();
  }
}
