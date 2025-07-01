<?php
namespace Giantpeach\Schnapps\Theme\Blocks\NewsList;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Theme\PostTypes\Post;

class NewsList extends Block
{
  /**
   * News list properties accessible in the template
   */
  public string $postType = "post";
  public string $taxonomy = "category";
  public int $perPage;
  public bool $showCategoryFilter;
  public ?array $categories;

  /**
   * The mount function replaces the constructor
   * and is where you should set any properties.
   *
   * @return void
   */
  public function mount(): void
  {
    $this->perPage = get_field("posts_per_page") ?? 8;
    $this->showCategoryFilter = get_field("show_category_filter") ?? false;

    $this->categories = $this->showCategoryFilter
      ? get_categories([
        "taxonomy" => $this->taxonomy,
        "hide_empty" => true,
        "show_option_all" => "All",
        "exclude" => [1],
      ])
      : null;
  }
}
