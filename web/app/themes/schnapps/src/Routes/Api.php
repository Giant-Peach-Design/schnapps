<?php

namespace Giantpeach\Schnapps\Theme\Routes;

use Giantpeach\Schnapps\Route\Route;
use Giantpeach\Schnapps\Theme\PostTypes\Post;

class Api
{
  public function __construct()
  {
    // api routes are accessible at /wp-json/schnapps/v1/{route}
    // Route::get("/example-route", function () {
    //   return [
    //     "message" => "Hello World!",
    //   ];
    // });

    Route::get('/news-items', [Post::class, 'getPageRequest']);
  }
}
