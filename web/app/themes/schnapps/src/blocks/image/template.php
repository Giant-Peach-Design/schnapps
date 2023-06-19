<picture class="block">
  <?php if ($this->url) : ?>
    <img class="w-full !h-full object-cover" src="<?php echo $this->url ?>" alt="<?php echo $this->alt ?>" />
  <?php endif; ?>
</picture>