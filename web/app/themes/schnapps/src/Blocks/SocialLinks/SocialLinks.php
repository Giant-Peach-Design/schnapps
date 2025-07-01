<?php
namespace Giantpeach\Schnapps\Theme\Blocks\SocialLinks;
use Giantpeach\Schnapps\Blocks\Block;

class SocialLinks extends Block
{
  /**
   * Social links properties accessible in the template
   */
  public array $socials = [];

  /**
   * The mount function replaces the constructor
   * and is where you should set any properties.
   *
   * @return void
   */
  public function mount(): void
  {
    $allSocials = [
      "linkedin" => [
        "url" => get_field("linkedin", "option"),
        "iconClass" => "fa-linkedin",
        "label" => "LinkedIn",
      ],
      "instagram" => [
        "url" => get_field("instagram", "option"),
        "iconClass" => "fa-instagram",
        "label" => "",
      ],
      "twitter" => [
        "url" => get_field("twitter", "option"),
        "iconClass" => "fa-x-twitter",
        "label" => "",
      ],
      "facebook" => [
        "url" => get_field("facebook", "option"),
        "iconClass" => "fa-facebook",
        "label" => "",
      ],
      "tiktok" => [
        "url" => get_field("tiktok", "option"),
        "iconClass" => "fa-tiktok",
        "label" => "",
      ],
      "pinterest" => [
        "url" => get_field("pinterest", "option"),
        "iconClass" => "fa-pinterest",
        "label" => "",
      ],
      "medium" => [
        "url" => get_field("medium", "option"),
        "iconClass" => "fa-medium",
        "label" => "",
      ],
      "whatsapp" => [
        "url" => get_field("whatsapp", "option"),
        "iconClass" => "fa-whatsapp",
        "label" => "",
      ],
      "youtube" => [
        "url" => get_field("youtube", "option"),
        "iconClass" => "fa-youtube",
        "label" => "",
      ],
      "threads" => [
        "url" => get_field("threads", "option"),
        "iconClass" => "fa-threads",
        "label" => "",
      ],
    ];

    $this->socials = array_filter($allSocials, function ($item) {
      return boolval($item["url"]);
    });
  }
}
