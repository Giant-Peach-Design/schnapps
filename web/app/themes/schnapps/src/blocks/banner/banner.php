<?php

namespace Giantpeach\Blocks\Banner;

use Giantpeach\Blocks\BlockInterface;

class Banner implements BlockInterface
{
  public $slides;

  public function __construct($slides)
  {
    $this->slides = $slides;
  }

  public function render()
  {
    echo include 'template.php';
  }

  public static function registerBlock()
  {
    register_block_type(__DIR__ . '/block.json');
  }

  public static function display()
  {
    $banner = new Banner(get_field('slides'));

    $banner->render();
  }
}
