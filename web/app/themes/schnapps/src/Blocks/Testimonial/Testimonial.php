<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Testimonial;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;

class Testimonial extends Block implements BlockInterface
{
  public static string $blockName = 'giantpeach/testimonial';
  
  public $quote;
  public $stars;
  public $author;
  public $cite;
  public $isChildOfSlider;

  public function __construct($quote,  $stars = 5, $author = '', $cite = '', $isChildOfSlider = false) {
    parent::__construct();

    $this->quote = $quote;
    $this->stars = $stars;
    $this->author = $author;
    $this->cite = $cite;
    $this->isChildOfSlider = $isChildOfSlider;
  }

  public static function display($block = [], $content = "", $is_preview = false, $postId = 0, $context = [], $contextVars = []): void {

    $testimonial = new Testimonial(
      quote: get_field('quote'),
      stars: get_field('stars'),
      author: get_field('author'),
      cite: get_field('cite'),
      isChildOfSlider: isset($contextVars['giantpeach/testimonialslider'])
    );
    $testimonial->render();
  }
}