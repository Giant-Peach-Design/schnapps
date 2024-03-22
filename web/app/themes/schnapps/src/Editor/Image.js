/**
 * Remove default Image block support
*/

const ImageOverrides = () => {
  wp.hooks.addFilter( 'blocks.registerBlockType', 'modify-block-supports/disable-default-image-support', ( settings, name ) => {
    if ( !settings?.supports ) {
      return settings;
    }

    if (name === 'core/image') {
      return Object.assign( {}, settings, {
        styles: [],
        supports: Object.assign( settings.supports, {
          filter: {
            duotone: false
          },
          __experimentalBorder: {
            radius: false,
            __experimentalDefaultControls: {
              radius: false
            }
          }
        } ),
      } );
    }

    return settings;
  });
};

export default ImageOverrides;
