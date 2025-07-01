<?php
namespace Giantpeach\Schnapps\Theme\Blocks\NewsRelated;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Query\Query;
use Giantpeach\Schnapps\Theme\PostTypes\Post;

class NewsRelated extends Block
{
  /**
   * News related properties accessible in the template
   */
  public array $posts = [];
  public array $archiveLink;
  public string $section_title;

  /**
   * The mount function replaces the constructor
   * and is where you should set any properties.
   *
   * @return void
   */
  public function mount(): void
  {
    $this->section_title = get_field("section_title");
    $displayRelated = get_field("display_related");
    $selectedPosts = get_field("items") ?? [];

    if ($displayRelated) {
      $this->posts = Post::related(2, get_the_ID());
    } else {
      $items = Query::getPosts("post", 2, [
        "page" => 1,
        "post_status" => "publish",
        "orderby" => "post__in",
        "order" => "DESC",
        "post__in" => $selectedPosts,
      ]);
      $this->posts = Post::formatPostOutput($items);
    }

    $this->archiveLink = [
      "title" => "All resources",
      "url" => get_permalink(get_field("news_page", "option")),
    ];
  }
}
