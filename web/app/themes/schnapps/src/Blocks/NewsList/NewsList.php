<?php

namespace Giantpeach\Schnapps\Theme\Blocks\NewsList;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Theme\PostTypes\Post;

class NewsList extends Block implements BlockInterface
{

  public static string $blockName = 'giantpeach/newslist';

  public $posts;

  public function __construct($perPage = 8)
  {
    $this->posts = Post::get($perPage);

    parent::__construct();
  }

  public static function display(): void
  {
    $postsPerPage = get_field('posts_per_page') ?? 8;
    $newsList = new NewsList($postsPerPage);
    $newsList->render();
  }
}
