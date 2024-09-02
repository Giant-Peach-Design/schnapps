<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Banner;

use Giantpeach\Schnapps\Blocks\Block;

class Banner extends Block
{
  /**
   * The blocks allowed within this block.
   *
   * @var array
   */
  public array $allowedBlocks = ["giantpeach/bannerslide"];

  /**
   * The default template for this block.
   *
   * @var array
   */
  public array $template = [["giantpeach/bannerslide"]];

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
   * It gets passed in the blocks settings / attributes
   * as an array.
   *
   * @return void
   */
  public function mount($args): void
  {
    $this->variableName = get_field("variable_name");
    $this->intVariable = get_field("int_variable");
  }
}
