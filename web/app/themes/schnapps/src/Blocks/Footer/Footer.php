<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Footer;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Navigation\Navigation;

class Footer extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/footer';
  
  public $logo;
  public $navigation;
  public $socials;
  public $copyrightText;

  private function getFooterNav($location) {
  	return [
    	'name' => wp_get_nav_menu_name($location),
    	'items' => Navigation::getNav($location)
    ];
  }

  public function __construct() {
    parent::__construct();

    $this->logo = wp_get_attachment_image_url(get_field('footer_logo', 'option'), 'full');
    $this->navigation = $this->getFooterNav('footer');
    $this->socials = render_block(parse_blocks('<!-- wp:giantpeach/sociallinks {"name":"giantpeach/sociallinks"} /-->')[0]);
    $this->copyrightText = get_field('copyright_text', 'option');
  }

  public static function display(): void {
	  $footer = new Footer();
	  $footer->render();
	}
}