<?php

namespace Giantpeach\Schnapps\Theme\Blocks\SocialLinks;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;

class SocialLinks extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/sociallinks';

  public $socials = [];

  public function __construct($socials = [])
  {
    parent::__construct();

    $this->socials = array_filter($socials, function($item) {
      return boolval($item['url']);
    });
  }

  public static function display(): void
  {
    $socials = [
      'linkedin' => [
        'url' => get_field('linkedin', 'option'),
        'iconClass' => 'fa-linkedin',
        'label' => 'Test'
      ],
      'instagram' => [
        'url' => get_field('instagram', 'option'),
        'iconClass' => 'fa-instagram',
        'label' => ''
      ],
      'twitter' => [
        'url' => get_field('twitter', 'option'),
        'iconClass' => 'fa-x-twitter',
        'label' => ''
      ],
      'facebook' => [
        'url' => get_field('facebook', 'option'),
        'iconClass' => 'fa-facebook',
        'label' => ''
      ]
    ];

    $socialLinks = new SocialLinks($socials);

    $socialLinks->render();
  }
}
