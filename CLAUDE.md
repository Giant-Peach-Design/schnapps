# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WordPress site built on **Bedrock** (Roots stack) with a **Sage**-based theme called **schnapps**. Uses **Lando** for local development, Composer for PHP dependency management, and pnpm + Vite for front-end assets.

## Architecture

- **Bedrock** manages WordPress as a dependency via Composer. WordPress core lives in `web/wp/`, application code in `web/app/`.
- **Theme location**: `web/app/themes/schnapps/` — this is a Sage theme using **Acorn** (Laravel components for WordPress) and **ACF Composer** for structured ACF blocks/fields.
- **Blade templates**: `web/app/themes/schnapps/resources/views/` — standard Sage Blade templating with layouts, partials, sections, blocks, and components.
- **View Composers**: `web/app/themes/schnapps/app/View/Composers/` — pass data to Blade views (e.g., `App.php`, `Post.php`).
- **ACF Blocks**: `web/app/themes/schnapps/app/Blocks/` — PHP block classes managed via **ACF Composer** (`log1x/acf-composer`); corresponding Blade views in `resources/views/blocks/`. Use `lando wp acorn acf:block <Name>` to scaffold new blocks.
- **Front-end**: Tailwind CSS v4, Alpine.js, Motion (framer-motion). Entry points defined in `vite.config.js`: `resources/css/app.css`, `resources/js/app.js`, `resources/css/editor.css`, `resources/js/editor.js`.
- **Config**: Bedrock environment config in `config/` with `application.php` and per-environment overrides in `config/environments/`. Environment variables via `.env`.

## Commands

### Root-level (from project root)

```bash
composer install          # Install PHP deps (also triggers theme composer install + npm build)
composer lint             # PHP lint check (Laravel Pint, PER preset)
composer lint:fix         # PHP lint auto-fix
```

### Theme (from `web/app/themes/schnapps/`)

```bash
pnpm install              # Install front-end dependencies
pnpm dev                  # Vite dev server with HMR
pnpm build                # Production build
composer install          # Theme PHP dependencies (Acorn, ACF Composer)
```

### WP-CLI (via Lando)

```bash
lando wp <command>        # All wp-cli commands must be prefixed with lando
```

## Accessibility

Accessibility is a top priority. All markup, components, and blocks must meet **WCAG 2.1 AA** standards at minimum. Use semantic HTML, proper ARIA attributes, visible focus states, sufficient colour contrast, and keyboard-navigable interactions throughout.

## Key Conventions

- PHP follows **PER** coding style (enforced by Pint). Config in `pint.json` — excludes `web/wp`, `web/app/plugins`, and default themes.
- Two separate `composer.json` files: root (Bedrock + plugins) and theme-level (Acorn + ACF Composer).
- Tailwind v4 with `@theme` directive for design tokens in `resources/css/app.css`. Custom CSS split across `rt.css`, `theme.css`, `fonts.css`.
- Vite aliases: `@scripts` → `resources/js`, `@styles` → `resources/css`, `@fonts` → `resources/fonts`, `@images` → `resources/images`.
- Plugins managed via Composer (wpackagist + private repos for ACF Pro, Gravity Forms, and Giant Peach packages).

## ACF Composer Notes

- Consecutive uppercase letters in class names get split individually by ACF Composer's auto-slug generator (e.g. `ContentCta` → `content-c-t-a`). For acronyms like CTA, URL, FAQ etc., set `public $slug = 'content-cta'` explicitly.

## Images — Always Use `@gpImage`

Never use raw `<img>` tags for ACF/WordPress images. Always use the `@gpImage` Blade directive (from the `giantpeach/wp-modern-images` plugin). It generates a `<picture>` element with WebP sources, retina (`2x`), and responsive breakpoints.

**Signature:** `@gpImage($imageId, $sizes, $options)`
- `$sizes`: array keyed by breakpoint (min-width px). `0` = smallest/mobile. E.g. `[0 => ['w' => 345, 'h' => 265], 1024 => ['w' => 726, 'h' => 562]]`
- Each size: `['w' => int, 'h' => int, 'fit' => 'cover', 'q' => 80]` (fit/q optional, defaults shown)
- `$options`: `['retina' => true, 'picture_class' => '', 'img_class' => '', 'alt' => '', 'loading' => 'lazy']` (all optional)
- ACF image fields should use `return_format => 'array'` so `$image['id']` is available.

## Button Components

Two reusable button components are available:
- `<x-button-link>` — renders an `<a>` tag. Props: `href`, `label`, `style` (primary/dark/ghost), `icon`, `target`, `title`, `nofollow`, `rel`.
- `<x-button>` — renders a `<button type="button">`. Props: `label`, `style`, `icon`. Supports Alpine.js directives via `$attributes` passthrough.

Both use `group/btn` named groups to avoid conflicts when nested inside other grouped elements. Update the colour classes in the Blade views to match your project palette.

## Gravity Forms

Setup includes filters to: disable GF theme CSS, enable legacy markup, strip inline `<style>` blocks, and replace `<input>` submit with `<button>`. The GF block editor fix (`resources/js/admin/gf-block-fix.js`) re-registers the GF block with `apiVersion: 3` to keep the editor in iframe mode. Add project-specific GF style overrides in `theme.css` under the Gravity Forms section.

## TinyMCE Style Formats

Heading style overrides (`.is-h1` through `.is-h6`) are registered in `setup.php` and styled via `rt.css`. Add project-specific groups (flourishes, colours, etc.) to the `$style_formats` array in `setup.php`.
