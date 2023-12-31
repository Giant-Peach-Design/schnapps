<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Column;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;

class Column extends Block implements BlockInterface
{

  private array $widthClasses = [
    'lg:w-1/12',
    'lg:w-2/12',
    'lg:w-3/12',
    'lg:w-4/12',
    'lg:w-5/12',
    'lg:w-6/12',
    'lg:w-7/12',
    'lg:w-8/12',
    'lg:w-9/12',
    'lg:w-10/12',
    'lg:w-11/12',
    'lg:w-12/12',
  ];

  private array $tabletWidthClasses = [
    'sm:w-1/12',
    'sm:w-2/12',
    'sm:w-3/12',
    'sm:w-4/12',
    'sm:w-5/12',
    'sm:w-6/12',
    'sm:w-7/12',
    'sm:w-8/12',
    'sm:w-9/12',
    'sm:w-10/12',
    'sm:w-11/12',
    'sm:w-12/12',
  ];

  private array $mobileWidthClasses = ['w-4/12', 'w-6/12', 'w-8/12', 'w-full'];

  public string $widthClass;
  public bool $flexGrow = false;
  public array $breakout = [];

  public static string $blockName = 'giantpeach/column';

  public function __construct($mobile = 4, $tablet = 6, $desktop = 6, $flexGrow = false, $display = [], $advancedControls = false, $breakout = [])
  {
    $this->flexGrow = $flexGrow;
    $widthClass = '';
    if ($advancedControls) {
      $this->widthClass = $widthClass = $this->widthClasses[$desktop - 1] . ' ' . $this->tabletWidthClasses[$tablet - 1] . ' ' . $this->mobileWidthClasses[$mobile - 1];

      if ($breakout) {
        $this->breakout = $breakout;
      }
    }

    parent::__construct();

    $this->classes = array_merge([
      'width' => $widthClass,
      'flexGrow' => $this->flexGrow ? 'flex-grow' : '',
      'display' => [
        'mobile' => $display['mobile'] ? 'block' : 'hidden',
        'tablet' => $display['tablet'] ? 'md:block' : 'md:hidden',
        'desktop' => $display['desktop'] ? 'lg:block' : 'lg:hidden',
      ]
    ], $this->getClasses());
  }

  public static function display(): void
  {
    $mobile = get_field('mobile') ?? 4;
    $tablet = get_field('tablet') ?? 6;
    $desktop = get_field('desktop') ?? 6;
    $flexGrow = get_field('fill_space') ?? false;
    $display = get_field('column_visibility') ?? [
      'mobile' => true,
      'tablet' => true,
      'desktop' => true,
    ];
    $advancedControls = get_field('advanced_controls') ?? false;

    $breakout = [
      'left' => get_field('break_out_of_container_left_side') ?? '',
      'right' => get_field('break_out_of_container_right_side') ?? '',
    ];

    $column = new Column(
      $mobile,
      $tablet,
      $desktop,
      $flexGrow,
      $display,
      $advancedControls,
      $breakout
    );
    $column->render();
  }
}
