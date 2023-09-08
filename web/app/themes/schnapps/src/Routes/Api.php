<?php

namespace Giantpeach\Schnapps\Theme\Routes;

use Giantpeach\Schnapps\Route\Route;
//use Giantpeach\Schnapps\Theme\PostTypes\Post;

class Api
{
  public function __construct()
  {
    Route::get('/example-route', function () {
      return [
        'message' => 'Hello World!',
      ];
    });

    //Route::get('/news', [Post::class, 'getPageRequest']);
  }
}
