<?php

namespace Giantpeach\Schnapps\Theme\Blocks\TestimonialSlider;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Compatability\Block as CompatabilityBlock;

class TestimonialSlider extends CompatabilityBlock
{
  public static string $blockName = "giantpeach/testimonialslider";

  public $allowedBlocks = ["giantpeach/testimonial"];

  public array $template = [
    ["giantpeach/testimonial", ["data" => ["quote" => "Add First Quote"]]],
    ["giantpeach/testimonial", ["data" => ["quote" => "Add Second Quote"]]],
  ];

  public $link;

  public function __construct($link)
  {
    parent::__construct();

    $this->link = $link;
  }

  public static function display(): void
  {
    $testimonialSlider = new TestimonialSlider(link: get_field("link"));
    $testimonialSlider->render();
  }
}
