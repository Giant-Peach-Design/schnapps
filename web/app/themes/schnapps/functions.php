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

add_filter('acf/load_field/name=taxonomy', 'acf_load_taxonomies');

function acf_load_taxonomies($field)
{
  foreach (get_taxonomies('', 'names') as $taxonomy) {
    $field['choices'][$taxonomy] = $taxonomy;
  }

  // return the field
  return $field;
}
