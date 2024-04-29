<?php

namespace Giantpeach\Schnapps\Theme\Blocks\NewsList;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Theme\PostTypes\Post;

class NewsList extends Block implements BlockInterface
{

  public static string $blockName = 'giantpeach/newslist';

  public $postType = 'post';
  public $taxonomy = 'category';
  public $perPage;
  public $showCategoryFilter;
  public $categories;

  public function __construct($perPage = 8, $showCategoryFilter = false)
  {
    parent::__construct();

    $this->perPage = $perPage ? $perPage : 2;
    $this->categories = $showCategoryFilter ? get_categories( [
      'taxonomy' => $this->taxonomy,
      'hide_empty' => true,
      'show_option_all' => 'All',
      'exclude' => [1],
    ] ) : null;
  }

  public static function display(): void
  {
    $newsList = new NewsList(
      perPage: get_field('posts_per_page') ?? 8,
      showCategoryFilter: get_field('show_category_filter') ?? false,
    );
    $newsList->render();
  }
}
