<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Banner;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Images\Facades\Images;

class Banner extends Block
{
  /**
   * Any other fields you want accessible in the template
   */
  public string $variableName;
  public int $intVariable;

  /**
   * The mount function replaces the constructor
   * and is where you should set any properties, but
   * isn't required if the block doesn't set any
   * properties.
   *
   * @return void
   */
  public array $image;
  public array $mobile;
  public $heading;
  public $content;
  public $link;
  public $slides;

  public function mount(): void
  {
    $image = get_image_field("image");
    $mobileImage = get_image_field("mobile");
    $this->slides = get_field("banner_slide");

    if ($image !== -1 && $image !== null) {
      $this->image = Images::get(
        image: $image,
        imageSize: "banner",
        mobileImage: $mobileImage,
      );
    }
  }
}
