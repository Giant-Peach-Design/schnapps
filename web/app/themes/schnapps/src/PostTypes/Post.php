<?php

namespace Giantpeach\Schnapps\Theme\PostTypes;

use Giantpeach\Schnapps\Images\Facades\Images;
use Giantpeach\Schnapps\Query\Query;
use Giantpeach\Schnapps\Twiglet\Twiglet;
use WP_REST_Request;

class Post
{
  public function __construct()
  {
    $this->registerTemplate();
  }
  
  public static function registerTemplate(): void
  {
    $postTypeObject = get_post_type_object('post');

    /**
     * Define the template for the post type
     */
    $postTypeObject->template = [
      [
        'giantpeach/columns', [],
        [
          [
            'giantpeach/column',
            [
              'data' => [
                "field_64a80c5747b9e" => 0,
                "field_64a80c1347b9d" => "1",
                "field_64909bfee93d5" => 6,
                "field_64a7d162f8fe9" => 8,
                "field_64a7d170f8feb" => 4
              ]
            ],
            [
              [
                'core/paragraph',
                [
                  'placeholder' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum est ultricies integer quis. Iaculis urna id volutpat lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac odio tempor orci dapibus ultrices in. Egestas diam in arcu cursus euismod.'
                ]
              ]
            ]
          ]
        ]
      ],
      [ 'giantpeach/newsrelated', ['data' => ["section_title" => "Related News", "display_related" => "1"]]]
    ];
  }

  public static function formatPostOutput($posts)
  {
    // Post data used in post-card.twig template
    if (!$posts) return [];

    $postsOutput = [];

    foreach ($posts as $post) {
      $postCategories = get_the_category($post->id);
      $postCategory = $postCategories ? $postCategories[0] : null;

      $p = [];
      $p['id'] = $post->id;
      $p['title'] = $post->title;
      $p['date'] = get_the_date("M j, Y", $post->id);
      $p['category'] = $postCategory ? [
        'name' =>  $postCategory->name,
        'slug' =>  $postCategory->slug,
        'url' =>  get_permalink(get_field('news_page', 'option')) . '?category=' . $postCategory->slug,
      ] : null;

      $p['link']  = [
        'url' => get_permalink($post->id),
        'title' => __('Read Article')
      ];

      $p['image'] = Images::get(get_post_thumbnail_id($post->id), 'article-tile');

      $postsOutput[] = $p;
    }

    return $postsOutput;
  }


  public static function get(int $perPage = 9, int $page = 1): array
  {
    $args = [
      'paged' => $page,
      'order' => 'DESC',
      'orderby' => 'date',
      'post_status' => 'publish'
    ];

    $posts = Query::getPosts('post', $perPage, $args);

    return self::formatPostOutput($posts);
  }

  public static function getResults(int $perPage = 9, $page = 1, $taxonomy = null, $categorySlug = null): array
  { 
    $args = [
      'paged' => $page,
      'order' => 'DESC',
      'orderby' => 'date',
      'post_status' => 'publish'
    ];

    if ($taxonomy && $categorySlug) {
      $args['tax_query'] = [
        [
          'taxonomy' => $taxonomy,
          'field'    => 'slug',
          'terms'    => $categorySlug,
        ]
      ];
    }

    $outputArr = Query::getQueryResults('post', $perPage, $args);

    if ($outputArr['posts']) {
      $outputArr['posts'] = self::formatPostOutput($outputArr['posts']);

      $outputArr['posts'] = Twiglet::getInstance()->render("src/Blocks/NewsList/items.twig", [
        'posts' => $outputArr['posts']
      ]);
    }

    return $outputArr;
  }

  public static function related(int $perPage, int $postId)
  {
    $postCategories = get_the_category(); // Query based on current post category.
    // $postCategories = false;

    $args = [
        'order' => 'DESC',
        'orderby' => 'date',
        'post_status' => 'publish',
        'post__not_in' => [$postId]
    ];

    if ($postCategories && count($postCategories)) {
      $args['tax_query'] = [
        [
          'taxonomy' => 'category',
          'field'    => 'term_id',
          'terms'    => $postCategories[0]->cat_ID,
        ]
      ];
    }

    $posts = Query::getPosts(
      'post',
      $perPage,
      $args
    );

    return self::formatPostOutput($posts);
  }

  public static function getPageRequest(WP_REST_Request $request)
  {
    $per_page = $request->get_param('per_page') ?? 8;
    $page = $request->get_param('pagenum') ?? 1;
    $taxonomy = 'category';
    $categorySlug = $request->get_param('category');

    return self::getResults($per_page, $page, $taxonomy, $categorySlug);
  }
}
