<?php

namespace Giantpeach\Schnapps\Theme\Tests\Feature;

use Giantpeach\Schnapps\Theme\Tests\TestCase;

class ExampleTest extends TestCase
{
  public function testExample()
  {
    $response = $this->get('/');
    $this->assertEquals(200, $response->getStatusCode());
  }
}
