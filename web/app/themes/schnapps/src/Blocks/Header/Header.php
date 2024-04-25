<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Header;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Navigation\Navigation;

class Header extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/header';

  public $logo;
  public $navigation;
  public $socials;

  public function __construct() {
    parent::__construct();

    $this->logo = wp_get_attachment_image_url(get_field('header_logo', 'option'), 'full');
    $this->navigation = Navigation::getNav('primary');
    $this->socials = render_block(parse_blocks('<!-- wp:giantpeach/sociallinks {"name":"giantpeach/sociallinks"} /-->')[0]);
  }

  public static function display(): void {
    $header = new Header();
    $header->render();
  }
}