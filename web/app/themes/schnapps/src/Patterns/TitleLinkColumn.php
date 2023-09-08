<?php

namespace Giantpeach\Schnapps\Theme\Patterns;

class TitleLinkColumn
{
  public static function init()
  {
    register_block_pattern(
      'giantpeach/title-link-column',
      [
        'title' => __('Title Link Column', 'schnapps'),
        'categories' => ['giantpeach', 'block-headers', 'page-headers', 'text'],
        'content' => '<!-- wp:giantpeach/columns {"name":"giantpeach/columns","data":{"block_spacing":"none","_block_spacing":"field_649c38e49d2af","desktop_justify_content":"xl:justify-start","_desktop_justify_content":"field_64a7facdb556b","tablet_justify_content":"md:justify-center","_tablet_justify_content":"field_64a7fd12d2467","mobile_justify_content":"justify-center","_mobile_justify_content":"field_64a7fd3cd2468","desktop_align_items":"xl:items-center","_desktop_align_items":"field_64a801d68d6e8","tablet_align_items":"md:items-center","_tablet_align_items":"field_64a801f58d6e9","mobile_align_items":"items-center","_mobile_align_items":"field_64a8020c8d6ea","wrap_columns":"1","_wrap_columns":"field_64a80594d7887"},"mode":"preview"} -->
<!-- wp:giantpeach/column {"name":"giantpeach/column","data":{"fill_space":"1","_fill_space":"field_64a80c5747b9e","advanced_controls":"0","_advanced_controls":"field_64a80c1347b9d","colour":"default","_colour":"field_649c28613a461","size":"base","_size":"field_649d4b9e6631d"},"mode":"preview"} -->
<!-- wp:heading -->
<h2 class="wp-block-heading">Our Work</h2>
<!-- /wp:heading -->
<!-- /wp:giantpeach/column -->

<!-- wp:giantpeach/column {"name":"giantpeach/column","data":{"fill_space":"0","_fill_space":"field_64a80c5747b9e","column_visibility_mobile":"0","_column_visibility_mobile":"field_64ae63d77f994","column_visibility_tablet":"1","_column_visibility_tablet":"field_64ae63e07f995","column_visibility_desktop":"1","_column_visibility_desktop":"field_64ae63e77f996","column_visibility":"","_column_visibility":"field_64ae635f7f993","advanced_controls":"0","_advanced_controls":"field_64a80c1347b9d","colour":"default","_colour":"field_649c28613a461","size":"base","_size":"field_649d4b9e6631d"},"mode":"preview"} -->
<!-- wp:giantpeach/button {"name":"giantpeach/button","data":{"text":"View all Our Work","_text":"field_64907e7e097fb","url":{"title":"","url":"/work","target":""},"_url":"field_64907e8d097fc","target":"_self","_target":"field_64907e9f097fd","rel":"default","_rel":"field_64907eb6097fe"},"mode":"preview"} /-->
<!-- /wp:giantpeach/column -->
<!-- /wp:giantpeach/columns -->'
      ]
    );
  }
}
