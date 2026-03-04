<?php

namespace App\Helpers;

class Taxonomy
{
    /**
     * Get the primary term for a post, falling back to the first term if no primary is set.
     * Works with The SEO Framework's primary term feature.
     *
     * @param int|null $postId The post ID (defaults to current post)
     * @param string $taxonomy The taxonomy slug (default: 'category')
     * @return \WP_Term|null The primary term object or null
     */
    public static function getPrimaryTerm(?int $postId = null, string $taxonomy = 'category'): ?\WP_Term
    {
        $postId = $postId ?: get_the_ID();

        if (! $postId) {
            return null;
        }

        // Try The SEO Framework first (v5.x API)
        if (class_exists('\The_SEO_Framework\Data\Plugin\Post')) {
            $term = \The_SEO_Framework\Data\Plugin\Post::get_primary_term($postId, $taxonomy);

            if ($term instanceof \WP_Term) {
                return $term;
            }
        }

        // Fallback: get all terms and return the first one
        $terms = get_the_terms($postId, $taxonomy);

        if ($terms && ! is_wp_error($terms)) {
            return $terms[0];
        }

        return null;
    }

    /**
     * Get the primary term name for a post.
     *
     * @param int|null $postId The post ID (defaults to current post)
     * @param string $taxonomy The taxonomy slug (default: 'category')
     * @return string|null The primary term name or null
     */
    public static function getPrimaryTermName(?int $postId = null, string $taxonomy = 'category'): ?string
    {
        $term = self::getPrimaryTerm($postId, $taxonomy);

        return $term ? html_entity_decode($term->name) : null;
    }
}
