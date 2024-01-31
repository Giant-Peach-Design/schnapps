<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Media;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Config\Facades\Config;
use Giantpeach\Schnapps\Images\Facades\Images;


class Media extends Block implements BlockInterface
{

  public static string $blockName = 'giantpeach/media';

  public array $image = [];
  public array $video = [];

  public function __construct()
  {
    parent::__construct();

    $image = get_field('image');
    $mobileImage = get_field('mobile_image');
    $imageSize = get_field('image_sizes') ?? 'full';

    $this->image = Images::get(
      image: $image ? $image['id'] : -1,
      mobileImage: $mobileImage ? $mobileImage['id'] : -1,
      imageSize: $imageSize
    );

    $this->video = $this->prepareVideo();
  }

  public function prepareVideo(): array
  {
    $video = get_field('video');
    $mobileVideo = get_field('mobile_video');

    if (!$video) {
      return [];
    }

    $imgSizes = Config::get('image-sizes');
    $imgSize = $imgSizes[get_field('image_sizes') ?? 'full'];

    $desktopWidth = $video['width'];
    $desktopHeight = $video['height'];
    $mobileWidth = $video['width'];
    $mobileHeight = $video['height'];

    if (!isset($imgSize['desktop'])) {
      $desktopWidth = $imgSize['w'] ?? $video['width'];
      $desktopHeight = $imgSize['h'] ?? $video['height'];
    }

    if (isset($imgSize['desktop'])) {
      $desktopWidth = $imgSize['desktop']['w'] ?? $video['width'];
      $desktopHeight = $imgSize['desktop']['h'] ?? $video['height'];
    }

    if (isset($imgSize['mobile'])) {
      $mobileWidth = $imgSize['mobile']['w'] ?? $video['width'];
      $mobileHeight = $imgSize['mobile']['h'] ?? $video['height'];
    }

    $v = [];

    if ($video) {
      $v['desktop'] = [
        'url' => $video['url'],
        'width' => $desktopWidth,
        'height' => $desktopHeight
      ];
    }

    if ($mobileVideo) {
      $v['mobile'] = [
        'url' => $mobileVideo['url'],
        'width' => $mobileWidth,
        'height' => $mobileHeight
      ];
    }

    return $v;
  }

  public static function display(): void
  {
    $media = new Media();
    $media->render();
  }
}
