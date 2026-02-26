/**
 * Fix Gravity Forms block apiVersion to restore editor iframe mode
 *
 * Gravity Forms registers its block with apiVersion 2, which forces the
 * editor out of iframe mode and breaks theme styles. This re-registers
 * the block with apiVersion 3 so the editor stays in iframe mode.
 */
wp.domReady(() => {
  const gfBlockName = 'gravityforms/form';

  // Check if the block exists
  const blockType = wp.blocks.getBlockType(gfBlockName);

  if (blockType && blockType.apiVersion !== 3) {
    // Unregister the old block
    wp.blocks.unregisterBlockType(gfBlockName);

    // Re-register with apiVersion 3
    wp.blocks.registerBlockType(gfBlockName, {
      ...blockType,
      apiVersion: 3,
    });
  }
});
