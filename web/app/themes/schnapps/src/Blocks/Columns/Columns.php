<?php

namespace Giantpeach\Schnapps\Theme\Blocks\Columns;

use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Traits\Spacing;

class Columns extends Block implements BlockInterface
{

  use Spacing;

  public static string $blockName = 'giantpeach/columns';

  public $allowedBlocks;
  public $justifyContent = [
    'desktop' => 'justify-center',
    'tablet' => 'justify-center',
    'mobile' => 'justify-center',
  ];
  public $alignItems = [
    'desktop' => 'items-start',
    'tablet' => 'items-start',
    'mobile' => 'items-start',
  ];

  protected $wrap = true;
  public string $wrapClass = 'flex-wrap';

  public function __construct($justifyContent, $alignItems, $wrap = true, $content = "")
  {
    parent::__construct();
    $this->allowedBlocks = [
      'giantpeach/column',
    ];

    $this->justifyContent = $justifyContent;
    $this->alignItems = $alignItems;

    if (!$wrap) {
      $this->wrap = false;
      $this->wrapClass = '';
    }
  }

  public static function display($block = [], $content = "", $is_preview = false, $postId = 0, $context = []): void
  {
    $justifyDesktop = get_field('desktop_justify_content') ?? 'xl:justify-center';
    $justifyTablet = get_field('tablet_justify_content') ?? 'md:justify-center';
    $justifyMobile = get_field('mobile_justify_content') ?? 'justify-center';

    $alignDesktop = get_field('desktop_align_items') ?? 'xl:items-start';
    $alignTablet = get_field('tablet_align_items') ?? 'md:items-start';
    $alignMobile = get_field('mobile_align_items') ?? 'items-start';

    $wrap = get_field('wrap_columns') ?? true;

    $justifyContent = [
      'desktop' => $justifyDesktop,
      'tablet' => $justifyTablet,
      'mobile' => $justifyMobile,
    ];

    $alignItems = [
      'desktop' => $alignDesktop,
      'tablet' => $alignTablet,
      'mobile' => $alignMobile,
    ];

    $columns = new Columns($justifyContent, $alignItems, $wrap, $content);
    $columns->render();
  }
}
