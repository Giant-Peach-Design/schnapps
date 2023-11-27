<?php

namespace Giantpeach\Schnapps\Theme\Blocks\LatestNews;

use Giantpeach\Schnapps\Blocks\Interfaces\BlockInterface;
use Giantpeach\Schnapps\Blocks\Block;
use Giantpeach\Schnapps\Query\Query;

class LatestNews extends Block implements BlockInterface
{

  public static string $blockName = 'giantpeach/latestnews';

  public array $posts = [];

  public function __construct($postsPerPage = 3)
  {
    $this->posts = Query::getPosts('post', $postsPerPage);

    parent::__construct();
  }

  public static function display(): void
  {
    $postsPerPage = get_field('number_of_posts') ?? 3;

    $latestNews = new LatestNews($postsPerPage);
    $latestNews->render();
  }
}
