<?php

namespace App\Providers;

use Roots\Acorn\Sage\SageServiceProvider;

class ThemeServiceProvider extends SageServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        parent::register();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        // Restrict available blocks in the editor
        add_filter('allowed_block_types_all', [$this, 'allowedBlockTypes'], 10, 2);

        // Feed rendered ACF block content to SEO Framework for description generation
        add_filter('the_seo_framework_get_excerpt', [$this, 'seoDescription'], 10, 2);
    }

    /**
     * Restrict available block types to essentials + ACF blocks.
     */
    public function allowedBlockTypes($allowedBlocks, $context): array
    {
        $coreBlocks = [
            // Text essentials
            'core/paragraph',
            'core/heading',
            'core/list',
            'core/list-item',

            // Media
            'core/image',
            'core/video',
            'core/embed',

            // Useful utilities
            'core/table',
            'core/separator',
            'core/spacer',

            // Escape hatches
            'core/html',
            'core/shortcode',
        ];

        // Auto-include all ACF blocks
        $acfBlocks = array_filter(
            array_keys(\WP_Block_Type_Registry::get_instance()->get_all_registered()),
            fn ($block) => str_starts_with($block, 'acf/')
        );

        return array_merge($coreBlocks, $acfBlocks);
    }

    /**
     * Provide rendered block content to SEO Framework when it can't read ACF blocks.
     */
    public function seoDescription(string $excerpt, ?array $args): string
    {
        if (! empty(trim($excerpt))) {
            return $excerpt;
        }

        $id = $args['id'] ?? get_the_ID();

        if (! $id || ! empty($args['tax'] ?? null)) {
            return $excerpt;
        }

        $post = get_post($id);

        if (! $post || empty($post->post_content)) {
            return $excerpt;
        }

        $rendered = apply_filters('the_content', $post->post_content);
        $text = wp_strip_all_tags($rendered);
        $text = preg_replace('/\s+/', ' ', trim($text));

        return $text;
    }
}
