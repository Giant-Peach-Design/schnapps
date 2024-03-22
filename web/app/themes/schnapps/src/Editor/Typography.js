/**
 * Remove default heading & paragraph block support
 */
const TypographyOverrides = () => {
	wp.hooks.addFilter( 'blocks.registerBlockType', 'modify-block-supports/disable-default-typography-support', ( settings, name ) => {
		// Bail early if the block does not have supports.
		if ( !settings?.supports ) {
			return settings;
		}

	  if (
			name === 'core/heading' ||
			name === 'core/paragraph' 
		) {
			return Object.assign( {}, settings, {
				supports: Object.assign( settings.supports, {
					color: {
						background: false,
						text: true,
						link: true
					},
					typography: {
						fontSize: false,
						lineHeight: false,
						__experimentalDefaultControls: {
							fontAppearance: true,
							fontSize: false,
							textTransform: true
						},
						__experimentalLetterSpacing: true,
						__experimentalTextDecoration: false,
						__experimentalFontStyle: true,
						__experimentalTextTransform: true
					},
					spacing: {
						margin: false,
						padding: false
					}
				} ),
			} );
		}

		return settings;
  });
};

export default TypographyOverrides;
