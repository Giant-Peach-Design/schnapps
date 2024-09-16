<?php

namespace Giantpeach\Schnapps\Theme\Blocks\BannerSlide;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Images\Facades\Images;

class BannerSlide extends Block
{
  public array $allowedBlocks = [
    "core/paragraph",
    "core/heading",
    "giantpeach/button",
  ];

  public array $template = [
    [
      "core/heading",
      ["level" => 2, "placeholder" => "Slide heading (optional)"],
    ],
    [
      "core/paragraph",
      [
        "placeholder" =>
          "During the strategic definition stage, the client’s business case and strategic brief are assessed to ensure they have been properly considered’ and the scope of the project is defined. This stage is not about design or the practical details.",
        "className" => "",
      ],
    ],
  ];

  public array $image;
  public array $mobile;

  public function mount(): void
  {
    $image = get_image_field("image");
    $mobileImage = get_image_field("mobile");

    if ($image !== -1 && $image !== null) {
      $this->image = Images::get(
        image: $image,
        imageSize: "banner",
        mobileImage: $mobileImage,
      );
    }
  }
}
