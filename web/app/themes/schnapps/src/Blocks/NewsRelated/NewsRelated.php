<?php

namespace Giantpeach\Schnapps\Theme\Blocks\NewsRelated;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Query\Query;
use Giantpeach\Schnapps\Theme\PostTypes\Post;

class NewsRelated extends Block implements BlockInterface
{

  public static string $blockName = 'giantpeach/newsrelated';

  public array $posts = [];
  public array $archiveLink;
  public $section_title;

  public function __construct($sectionTitle, $displayRelated, $posts = [])
  {
    parent::__construct();
    $this->section_title = $sectionTitle;

    if ($displayRelated) {
      $this->posts = Post::related(2, get_the_ID());
    } else {
      $items = Query::getPosts('post', 2, [
       'page' => 1,
       'post_status' => 'publish',
       'orderby' => 'post__in',
       'order' => 'DESC',
       'post__in' => $posts
      ]);

      $this->posts = Post::formatPostOutput($items);
    }

    $this->archiveLink = [
      'title' => 'All resources',
      'url' => get_permalink(get_field('news_page', 'option'))
    ];

  }

  public static function display(): void
  {
    $newsRelated = new NewsRelated(
      sectionTitle: get_field('section_title'),
      displayRelated: get_field('display_related'),
      posts: get_field('items') ?? []
    );
    $newsRelated->render();
  }
}
