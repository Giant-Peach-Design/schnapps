# Peach Schnapps

![Schnapps](https://img.shields.io/badge/Peach-Schnapps-%23aea0fd?style=for-the-badge)

## What is Peach Schnapps

Peach Schnapps is our Wordpress site boilerplate based on the [roots.io](http://roots.io) stack, making use of Bedrock for the site structure and the new WP Block Theme functionality for the theme.

### Stack

- Lando
- Bedrock
- AlpineJS
- TailwindCSS
- Parcel
- Twig for templating

### Pre-requisites

- [Lando](https://lando.dev)
- [Composer](https://getcomposer.org)
- An auth.json file in your home directory with your ACF Pro key in it, see [here](https://www.advancedcustomfields.com/resources/installing-acf-pro-with-composer/) for more info, e.g. `~/.composer/auth.json`

```json
{
  "http-basic": {
    "connect.advancedcustomfields.com": {
      "username": "your-key-here",
      "password": "http://wp-playground.lndo.site"
    }
  }
}
```

### Modules

Peach Schnapps comprises of several different modules, designed to be updated separately to ease future development and support on projects.

These modules are:

- Navigation
  - Simplifies creation and templating of navigation menus within Wordpress, to avoid using `wp_nav_menu()`
- Twiglet
  - Allows use of Twig templates within the theme to make working with Blocks easier
- Images
  - A more flexible way of handling / displaying images. You just output the image at the size you want and it's automatically resized/cropped. Additionally, allows easy conversion to webp. You no longer need to rely on `add_image_size()` . Allows creation of blocks with image sizing fields - maybe you could pick from a pre-set list, or maybe the end user can just enter some numbers, it's ezpz.
- Blocks
  - Simplifies the creation, registration and rendering of Gutenberg blocks
- Query
  - A wrapper around WP_Query to simplify querying posts
- Route
  - A wrapper around wp_register_rest_route to simplify usage

## Theme Folder Structure

```plain
/
/acf-json
/build
/build/blocks
/dist
/parts
/src
/src/Blocks
/src/Components
/src/fonts
/src/Patterns
```

## Blocks

Blocks in Peach Schnapps are handled by the `giantpeach/blocks` library. This library contains some simple wrappers around block creation / registration / rendering to make life easier, and it allows a mixture of ACF Blocks and those using Wordpress Block API directly.

The following blocks are included:

- Logo
- Banner
- Columns
  - Column
- Image
- Button

### Creating Blocks

#### **Easy Way**

There is a `create-block` WP CLI command you can run using `lando wp create-block <blockname>` to scaffold a block.

#### **Manual Way**

Additional blocks can easily be created using either ACF Blocks or the Wordpress Block API. The simplest way is to use ACF Blocks, and there's a `BlockInterface` PHP class interface and several examples to help out (e.g. the Banner block).

For any block where you require more control over the markup in the editor you may want to reach for the Wordpress Block API. Blocks created in either way are fully compatible with each other.

All blocks need to be added to the `$blocks` variable in the `Giantpeach\Schnapps\Blocks` class in order to be registered.

##### Creating an ACF Block

Additional ACF Blocks can easily be created by creating a new folder within the `src/blocks` folder with a block.json and the PHP class at a minimum.

The block.json should contain the following:

```json
{
  "name": "giantpeach/banner",
  "title": "Banner",
  "description": "Banner Block",
  "category": "formatting",
  "icon": "admin-comments",
  "keywords": ["banner"],
  "acf": {
    "mode": "preview",
    "renderCallback": "Giantpeach\\Blocks\\Banner\\Banner::display"
  },
  "align": "full",
  "supports": {
    "jsx": true
  }
}
```

The PHP class needs to implement the BlockInterface, here is a minimal example:

```php
<?php

namespace Giantpeach\Blocks\Banner;

use Giantpeach\Blocks\BlockInterface;

class Banner extends Block implements BlockInterface
{
  public $slides;

  public function __construct($slides)
  {
    $this->slides = $slides;
  }

  public static function display()
  {
    $banner = new Banner(get_field('slides'));
    $banner->render();
  }
}
```

You will then be able to head to ACF > Field Groups and attach any fields you like to the block.

##### Creating a Wordpress Block

Creating a Wordpress Block is a little more involved and will require you to become familiar with the Wordpress Block API, as well as requiring an additional build step.

These Blocks are harder to reuse outside of the Wordpress Block editor.

### Blocks Class

The `Giantpeach\Schnapps\Theme\Blocks\Blocks` class is where all block and pattern registration is handled. Add your blocks to the `$blocks` array and they will be registered and useable within the site.

Patterns currently require manual initialisation in the `registerPatterns` method. You can see an example in the `Giantpeach\Schnapps\Theme\Patterns\TitleLinkColumn` class.

### Block Class

The `Giantpeach\Schnapps\Blocks\Block` class handles block registration, rendering the twig template and provides some classes to handle font size and block spacing. Each block you create using the `create-block` command will be set up to inherit from this class but you can always create a specific class that inherits it if the project has certain requirements that aren't covered by the defaults.

#### Class Properties

`$blockName` - e.g. 'giantpeach/block'

`$isAdmin` - true if in the block editor, false if viewing block on the front end. Useful if you need to apply specific styling in the admin

`$blockSpacing` - an array of different padding for use on the block

`$classes` - an array of classes for use in the template, e.g. `{{ classes.block.spacing }}`

#### Class Methods

`getClasses()` - constructs the `$classes` array

`render()` - renders the `view.twig` template if found, otherwise renders the `template.php` template instead

`getBlockName()` - returns the block name

`registerBlock()` - loads and registers the `block.json`

`display()` - used to create and render the block in the block editor

`getBlockNameFromDir()`

## Patterns

Patterns are collections of blocks that you can drop into the page. You click the pattern and the blocks that make up the pattern are inserted into the page, ready for you to edit.

It’s also possible to create a new pattern, either in code or via the admin interface (which will be saved within the DB).
