<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Column;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Classes;
use Giantpeach\Schnapps\Blocks\Traits\Prose;
use Giantpeach\Schnapps\Blocks\Traits\Spacing;

class Column extends Block implements BlockInterface
{
  use Prose;

  /**
   * An array of desktop width classes for the Column block.
   *
   * @var array
   */
  private array $widthClasses = [
    "lg:w-1/12",
    "lg:w-2/12",
    "lg:w-3/12",
    "lg:w-4/12",
    "lg:w-5/12",
    "lg:w-6/12",
    "lg:w-7/12",
    "lg:w-8/12",
    "lg:w-9/12",
    "lg:w-10/12",
    "lg:w-11/12",
    "lg:w-12/12",
  ];

  /**
   * This private property represents an array of tablet width classes.
   *
   * @var array
   */
  private array $tabletWidthClasses = [
    "sm:w-1/12",
    "sm:w-2/12",
    "sm:w-3/12",
    "sm:w-4/12",
    "sm:w-5/12",
    "sm:w-6/12",
    "sm:w-7/12",
    "sm:w-8/12",
    "sm:w-9/12",
    "sm:w-10/12",
    "sm:w-11/12",
    "sm:w-12/12",
  ];

  /**
   * An array of CSS classes representing the width of the column on mobile devices.
   *
   * @var array
   */
  private array $mobileWidthClasses = ["w-4/12", "w-6/12", "w-8/12", "w-full"];

  /**
   * The classes for the column.
   *
   * @var Classes
   */
  public Classes $columnClass;

  public static string $blockName = "giantpeach/column";

  public function __construct()
  {
    parent::__construct();

    $this->columnClass = new Classes();

    $flexGrow = get_field("fill_space") ?? false;

    $desktopWidth = (int) get_field("desktop") ?? 6;
    $tabletWidth = (int) get_field("tablet") ?? 6;
    $mobileWidth = (int) get_field("mobile") ?? 4;

    $desktopVisible = get_field("desktop_visible") ?? true;
    $tabletVisible = get_field("tablet_visible") ?? true;
    $mobileVisible = get_field("mobile_visible") ?? true;

    // if fill_space is set to false then we want to use the width
    // settings to determine the width of the column.
    if (!$flexGrow) {
      $this->columnClass->add($this->widthClasses[$desktopWidth - 1]);
      $this->columnClass->add($this->tabletWidthClasses[$tabletWidth - 1]);
      $this->columnClass->add($this->mobileWidthClasses[$mobileWidth - 1]);
    } else {
      $this->columnClass->add("flex-grow");
    }

    $this->columnClass->add($desktopVisible ? "lg:block" : "lg:hidden");
    $this->columnClass->add($tabletVisible ? "md:block" : "md:hidden");
    $this->columnClass->add($mobileVisible ? "block" : "hidden");
  }

  public static function display(): void
  {
    $column = new Column();
    $column->render();
  }
}
