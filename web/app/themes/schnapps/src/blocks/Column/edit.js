/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, RangeControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.css';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  const innerBlockProps = useInnerBlocksProps({
    ...blockProps,
  });

  const widthClasses = [
    'w-1/12',
    'w-2/12',
    'w-3/12',
    'w-4/12',
    'w-5/12',
    'w-6/12',
    'w-7/12',
    'w-8/12',
    'w-9/12',
    'w-10/12',
    'w-11/12',
    'w-12/12',
  ];

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Column Settings', 'schnapps')}>
          <RangeControl
            label={__('Column Width', 'schnapps')}
            value={attributes.columnWidth}
            onChange={(value) => setAttributes({ columnWidth: value })}
            min={1}
            step={1}
            max={12}
          />
        </PanelBody>
      </InspectorControls>
      <div
        {...innerBlockProps}
        className={`py-8 bg-red-500 ${
          widthClasses[attributes.columnWidth - 1]
        }`}
      />
    </>
  );
}
