<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Logo;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Twiglet\Twiglet;

class Logo extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/logo';

  public $url;
  public $alt;
  public $width;
  public $height;

  public $mobileUrl;
  public $mobileAlt;
  public $mobileWidth;
  public $mobileHeight;

  public function __construct()
  {
    parent::__construct();
    $logo = get_field('logo');
    $mobileLogo = get_field('mobile_logo');

    if (!$logo) {
      return;
    }

    $this->url = $logo['url'];
    $this->alt = $logo['alt'];
    $this->width = $logo['width'];
    $this->height = $logo['height'];

    if ($mobileLogo) {
      $this->mobileUrl = $mobileLogo['url'] ?? null;
      $this->mobileAlt = $mobileLogo['alt'] ?? '';
      $this->mobileWidth = $mobileLogo['width'];
      $this->mobileHeight = $mobileLogo['height'];
    }
  }

  public static function display(): void
  {

    $logo = new Logo();
    $logo->render();
  }
}
