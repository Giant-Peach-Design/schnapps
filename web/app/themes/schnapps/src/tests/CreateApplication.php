<?php

namespace Giantpeach\Schnapps\Theme\Tests;

trait CreateApplication
{
  public function createApplication()
  {
    // get path to wp-config.php

    require_once dirname(__DIR__, 6) . '/vendor/autoload.php';
    require_once dirname(__DIR__, 6) . '/config/application.php';
    require_once ABSPATH . 'wp-settings.php';
  }
}
