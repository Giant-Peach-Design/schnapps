<?php

new Giantpeach\Schnapps\Theme\Schnapps();

add_filter('acf/load_field/name=post_type', 'acf_load_post_types');

function acf_load_post_types($field)
{
  foreach (get_post_types('', 'names') as $post_type) {
    $field['choices'][$post_type] = $post_type;
  }

  // return the field
  return $field;
}
