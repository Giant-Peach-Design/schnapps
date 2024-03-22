// Example. Add option to text/header toolbar. Require these 2 packages via npm first.

import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';

const GpCustomButton = ( { isActive, onChange, value } ) => {
  return (
    <RichTextToolbarButton
      icon="editor-textcolor"
      title={ 'Custom button' }
      onClick={ () => {
        onChange(
          toggleFormat( value, {
            type: 'giantpeach/custom-button',
          } )
        );
      } }
      isActive={ isActive }
    />
  );
};
  
const CustomButton = () => {
  registerFormatType( 'giantpeach/custom-button', {
    title: 'Custom button',
    tagName: 'mark',
    className: 'gp-custom-button',
    edit: GpCustomButton,
  } );
}

export default CustomButton;
