<?php

namespace Giantpeach\Schnapps\Theme\Tests;

use Mockery;

use function Env\env;



abstract class TestCase extends \PHPUnit\Framework\TestCase
{
  use CreateApplication;

  protected $client;

  public function setUp(): void
  {
    parent::setUp();
    $this->createApplication();
    $this->client = new \GuzzleHttp\Client(
      [
        'base_uri' => env('WP_HOME'),
        'cookies' => true,
        'http_errors' => false,
      ]
    );
  }

  public function tearDown(): void
  {
    parent::tearDown();
    $this->client = null;
    Mockery::close();
  }

  public function get($url = null)
  {
    return $this->client->get($url);
  }
}
