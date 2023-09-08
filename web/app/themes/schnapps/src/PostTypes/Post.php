<?php

namespace Giantpeach\Schnapps\Theme\PostTypes;

use Giantpeach\Schnapps\Images\Facades\Images;
use Giantpeach\Schnapps\Query\Query;
use Giantpeach\Schnapps\Twiglet\Twiglet;
use WP_REST_Request;

class Post
{
  public static function registerTemplate(): void
  {
    $postTypeObject = get_post_type_object('post');

    /**
     * Define the template for the post type
     */
    $postTypeObject->template = [
      [
        'giantpeach/pagetitle'
      ],
      [
        'giantpeach/columns', [
          'data' => [
            'field_649c38e49d2af' => 'none'
          ]
        ],
        [
          [
            'giantpeach/column',
            [
              'data' => [
                "field_64a80c5747b9e" => 1,
              ],
            ],
            [
              [
                'giantpeach/image',
                [
                  'data' => [
                    "field_64b51ba192a9d" => [
                      "field_64aea43643505" => 1,
                      "field_64ae9a7415e64" => 1800,
                      "field_64ae9b0015e65" => 1013,
                      "field_64ae9b0815e66" => 1,
                      "field_64ae9b3615e67" => 390,
                      "field_64ae9b4515e68" => 328
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ],
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
                  'placeholder' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum est ultricies integer quis. Iaculis urna id volutpat lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac odio tempor orci dapibus ultrices in. Egestas diam in arcu cursus euismod. Dictum fusce ut placerat orci nulla. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Tempor id eu nisl nunc mi ipsum faucibus. Fusce id velit ut tortor pretium. Massa ultricies mi quis hendrerit dolor magna eget. Nullam eget felis eget nunc lobortis. Faucibus ornare suspendisse sed nisi. '
                ]
              ]
            ]

          ]
        ]
      ],
      [
        'giantpeach/relatedposts'
      ]
    ];
  }

  protected static function formatForOutput($posts)
  {
    $postsOutput = [];

    if ($posts) {
      $index = 0;
      foreach ($posts as $post) {
        $p = [];
        $p['id'] = $post->id;
        $p['title'] = $post->title;
        $p['link']  = [
          'url' => get_permalink($post->id),
          'title' => $post->title
        ];

        $thumbnailId = get_post_thumbnail_id($post->id);
        $p['thumbnailId'] = $thumbnailId;

        $desktopSizes = [
          [
            'w' => 576,
            'h' => 587,
          ],
          [
            'w' => 576,
            'h' => 387,
          ],
          [
            'w' => 576,
            'h' => 488,
          ]
        ];

        if ($thumbnailId) {
          $imgArray = Images::getImages(
            [
              'id' => $thumbnailId,
              'params' => [
                'w' => $desktopSizes[$index % 3]['w'],
                'h' => $desktopSizes[$index % 3]['h'],
                'fit' => 'crop'
              ]
            ],
            [
              'id' => $thumbnailId,
              'params' => [
                'w' => $desktopSizes[$index % 3]['w'],
                'h' => $desktopSizes[$index % 3]['h'],
                'fit' => 'crop'
              ]
            ]
          );

          $p['image'] = $imgArray;
        }

        $index++;
        $postsOutput[] = $p;
      }
    }

    return $postsOutput;
  }


  public static function get(int $perPage = 8, int $page = 1): array
  {
    $posts = Query::getPosts(
      'post',
      $perPage,
      [
        'paged' => $page,
        'order' => 'DESC',
        'orderby' => 'date',
        'post_status' => 'publish'
      ]
    );

    return self::formatForOutput($posts);
  }

  public static function related(int $perPage, int $postId)
  {
    $posts = Query::getPosts(
      'post',
      $perPage,
      [
        'order' => 'DESC',
        'orderby' => 'date',
        'post_status' => 'publish',
        'post__not_in' => [$postId]
      ]
    );

    return self::formatForOutput($posts);
  }

  public static function getPage($page = 2)
  {
    $posts = self::get(9, $page);

    Twiglet::getInstance()->display("src/Blocks/NewsList/items.twig", [
      'posts' => $posts
    ]);
  }

  public static function getPageRequest(WP_REST_Request $request)
  {
    $page = $request->get_param('page') ?? 2;
    $posts = self::getPage($page);

    if ($posts) {
      return $posts;
    }

    return;
  }
}
