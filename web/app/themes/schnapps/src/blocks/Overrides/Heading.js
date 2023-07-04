/**
 * Add custom styles to Heading block.
 */
const HeadingOverrides = () => {
  wp.blocks.registerBlockStyle('core/heading', {
    name: 'default',
    label: 'Default',
    isDefault: true,
  });

  wp.blocks.registerBlockStyle('core/heading', {
    name: 'small',
    label: 'Small',
  });
};

export default HeadingOverrides;
