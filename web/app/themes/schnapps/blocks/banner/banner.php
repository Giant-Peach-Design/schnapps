<section class="banner relative">



    <?php if (get_field('image')) : ?>
        <?php $image = get_field('image'); ?>
        <div class="max-w-[672px] rounded-t-[60px] overflow-hidden lg:rounded-tl-none lg:mt-16">
            <picture class="aspect-[672/989] block">
                <img class="w-full !h-full object-cover" src="<?php echo $image['url'] ?>" alt="<?php echo $image['alt'] ?>" />
            </picture>
        </div>
    <?php endif; ?>

    <?php if (get_field('title_lines')) : ?>
        <div class="container absolute top-0 left-auto right-auto">
            <h1 class="text-[170px] uppercase">
                <?php $i = 0; ?>
                <?php while (have_rows('title_lines')) : ?>
                    <?php the_row(); ?>
                    <?php
                    $class = '';
                    switch ($i) {
                        case 0:
                            $class = 'block text-center';
                            break;
                        case 1:
                            $class = 'block text-left';
                            break;
                        case 2:
                            $class = 'block text-right';
                            break;
                    }
                    ?>
                    <span class="<?php echo $class; ?>">
                        <?php the_sub_field('line'); ?>
                    </span>
                    <?php $i++; ?>
                <?php endwhile; ?>

            </h1>
        </div>
    <?php endif; ?>
</section>