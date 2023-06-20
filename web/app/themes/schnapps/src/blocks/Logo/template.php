<a class="max-w-[63px] block" href="/">
  <picture class="block">
    <?php if ($this->mobileUrl) : ?>
      <source media="(max-width: 767px)" srcset="<?php echo $this->mobileUrl ?>" />
    <?php endif; ?>
    <?php if ($this->url) : ?>
      <img width="<?php echo $this->width; ?>" height="<?php echo $this->height; ?>" class="w-full !h-full object-cover" src="<?php echo $this->url ?>" alt="<?php echo $this->alt ?>" />
    <?php endif; ?>
  </picture>
</a>