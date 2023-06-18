<picture class="block">
  <?php if (get_field('image')) : ?>
    <?php $image = get_field('image'); ?>
    <img class="w-full !h-full object-cover" src="<?php echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" />
  <?php endif; ?>
</picture>