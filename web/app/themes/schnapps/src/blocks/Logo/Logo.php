<?php

namespace Giantpeach\Blocks\Logo;

use Giantpeach\Blocks\Block;
use Giantpeach\Interfaces\Blocks\BlockInterface;

class Logo extends Block implements BlockInterface
{

  public $url;
  public $alt;
  public $width;
  public $height;

  public $mobileUrl;
  public $mobileAlt;
  public $mobileWidth;
  public $mobileHeight;

  public function __construct($url, $alt, $width, $height, $mobileUrl, $mobileAlt, $mobileWidth, $mobileHeight)
  {
    $this->url = $url ?? null;
    $this->alt = $alt ?? '';
    $this->width = $width;
    $this->height = $height;

    $this->mobileUrl = $mobileUrl ?? null;
    $this->mobileAlt = $mobileAlt ?? '';
    $this->mobileWidth = $mobileWidth;
    $this->mobileHeight = $mobileHeight;
  }


  public static function getBlockName(): string
  {
    return 'giantpeach/logo';
  }

  public static function display(): void
  {
    $mobileLogo = get_field('mobile_logo');

    $logo = new Logo(
      get_field('logo')['url'],
      get_field('logo')['alt'],
      get_field('logo')['width'],
      get_field('logo')['height'],
      $mobileLogo['url'] ?? null,
      $mobileLogo['alt'] ?? '',
      $mobileLogo['width'] ?? null,
      $mobileLogo['height'] ?? null

    );
    $logo->render();
  }
}
