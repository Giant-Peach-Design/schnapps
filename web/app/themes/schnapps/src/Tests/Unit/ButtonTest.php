<?php

use Giantpeach\Schnapps\Theme\Blocks\Button\Button;
use Giantpeach\Schnapps\Theme\Tests\CreateApplication;
use Giantpeach\Schnapps\Theme\Tests\TestCase;

function get_field($field)
{
  return $field;
}

class ButtonTest extends TestCase
{
  public function testButtonRenders()
  {
    $text = 'Button Text';
    $url = 'https://example.com';
    $target = '_blank';
    $rel = 'nofollow';
    $size = 'large';

    $button = new Button($text, $url, $target, $rel, $size);

    $templateData = $button->render();

    $this->assertEquals($text, $button->text);
    $this->assertEquals($url, $button->url);
    $this->assertEquals($target, $button->target);
    $this->assertEquals($rel, $button->rel);
    $this->assertEquals($size, $button->size);

    $this->assertStringContainsString($text, $templateData);
    $this->assertStringContainsString($url, $templateData);
    $this->assertStringContainsString($target, $templateData);
    $this->assertStringContainsString($rel, $templateData);
    $this->assertStringContainsString($size, $templateData);
  }
}
