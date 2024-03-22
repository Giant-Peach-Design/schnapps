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


  /*
  wp.blocks.registerBlockStyle('core/heading', {
    name: 'h1',
    label: 'h1',
  });

  wp.blocks.registerBlockStyle('core/heading', {
    name: 'h2-5',
    label: 'h2.5',
  });

  wp.blocks.registerBlockStyle('core/heading', {
    name: 'h2',
    label: 'h2',
  });

  wp.blocks.registerBlockStyle('core/heading', {
    name: 'h3',
    label: 'h3',
  });

  wp.blocks.registerBlockStyle('core/heading', {
    name: 'h4',
    label: 'h4',
  });
  */

};

export default HeadingOverrides;
