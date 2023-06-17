<section class="banner relative aspect-video overflow-hidden">

    <div class="blaze-slider">
        <div class="blaze-container">
            <div class="blaze-track-container">
                <div class="blaze-track">
                    <?php while (have_rows('slides')) : ?>
                        <?php the_row(); ?>
                        <div class="relative">
                            <?php if (get_sub_field('image')) : ?>
                                <?php $image = get_sub_field('image'); ?>
                                <picture class="aspect-video block">
                                    <img class="w-full !h-full object-cover" src="<?php echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" />
                                </picture>
                            <?php endif; ?>

                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="container py-8 bg-red-100">
                                    <?php the_sub_field('caption'); ?>
                                </div>
                            </div>
                        </div>
                    <?php endwhile; ?>
                </div>
            </div>
        </div>
    </div>

</section>