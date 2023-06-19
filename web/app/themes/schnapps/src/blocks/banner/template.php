<section class="banner relative aspect-video overflow-hidden">

    <div class="blaze-slider">
        <div class="blaze-container">
            <div class="blaze-track-container">
                <div class="blaze-track">
                    <?php foreach ($this->slides as $slide) : ?>
                        <div class="relative">
                            <?php if ($slide['image']) : ?>
                                <?php $image = $slide['image']; ?>
                                <picture class="aspect-video block">
                                    <img class="w-full !h-full object-cover" src="<?php echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" />
                                </picture>
                            <?php endif; ?>

                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="container py-8 bg-red-100">
                                    <?php echo $slide['caption'] ?>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>

</section>