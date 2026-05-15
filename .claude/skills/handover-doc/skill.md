---
name: handover-doc
description: Generate a handover document listing all ACF blocks, custom post types, taxonomies, and theme settings with their fields and descriptions. Use when handing a project to a testing team, client, or another developer.
---

# Handover Document Generator

Generate a comprehensive markdown document covering all content types in the WordPress theme.

## What to document

### 1. ACF Blocks
Scan `web/app/themes/schnapps/app/Blocks/` for all block classes. For each block:
- **Name** and **description** (from class properties)
- **Slug** (only if explicitly set, i.e. differs from auto-generated)
- **All ACF fields** from the `fields()` method — name, type, instructions, defaults, conditional logic
- **Block styles** if the `$styles` property is set
- **Brief summary** of what the block renders (check the corresponding Blade view in `resources/views/blocks/`)
- Note any shared traits like `HasTheme`, `HasClipPath`, or shared field partials like `Button`

### 2. Custom Post Types
Scan `web/app/themes/schnapps/app/PostTypes/` for all post type classes. For each:
- **Label**, **slug**, and **description**
- **Supports** (title, editor, featured image, etc.)
- **Custom fields** registered for it (check `app/Fields/` for field classes that target the post type)
- **Default block template** if one is registered
- **Associated taxonomies** and any custom fields on those taxonomies

### 3. Theme Settings
Read `web/app/themes/schnapps/app/Options/ThemeSettings.php` (or any other Options classes). Document:
- All tabs and their fields
- Field types, labels, instructions, and defaults

## Output format

Structure the document with clear markdown headings:

```
# [Project Name] — Blocks, Post Types & Theme Settings

## ACF Blocks
### Block Name
Description of what the block does.
- `field_name` (Type): Instructions/description
- `repeater_name` (Repeater): Description
  - `sub_field` (Type): Description

## Custom Post Types
### Post Type Name (`slug`)
Description and what it's used for.
- **Supports:** title, editor, featured image
- **Fields:** `field_name` (Type): Description
- **Taxonomy:** `taxonomy_slug` — description

## Theme Settings
### Tab Name
- `field_name` (Type): Description
```

## Tips
- Check for `$slug` properties on blocks — ACF Composer auto-generates slugs from class names but consecutive uppercase letters get split (e.g. `ContentCta` becomes `content-c-t-a` unless `$slug` is set explicitly)
- Look for shared field partials in `app/Fields/` (e.g. `Button.php`, `ThemeSelector.php`, `ClipPathSelector.php`)
- Check `ThemeServiceProvider.php` and `setup.php` for any post type templates or additional registrations
- Note any auto-classification logic (e.g. events auto-categorised by date)
