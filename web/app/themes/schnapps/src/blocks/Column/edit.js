/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { sprintf, __ } from '@wordpress/i18n';

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
  InnerBlocks,
  BlockControls,
  store as blockEditorStore,
} from '@wordpress/block-editor';

import { PanelBody, RangeControl } from '@wordpress/components';

import { useSelect } from '@wordpress/data';

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
export default function Edit({ attributes, setAttributes, clientId }) {
  const { columnsIds, hasChildBlocks, rootClientId } = useSelect(
    (select) => {
      const { getBlockOrder, getBlockRootClientId } = select(blockEditorStore);

      const rootId = getBlockRootClientId(clientId);

      return {
        hasChildBlocks: getBlockOrder(clientId).length > 0,
        rootClientId: rootId,
        columnsIds: getBlockOrder(rootId),
      };
    },
    [clientId],
  );

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

  const blockProps = useBlockProps({
    className: `outline-1 outline-dashed ${
      widthClasses[attributes.columnWidth - 1]
    }`,
  });

  const columnsCount = columnsIds.length;
  const currentColumnPosition = columnsIds.indexOf(clientId) + 1;

  const label = sprintf(
    /* translators: 1: Block label (i.e. "Block: Column"), 2: Position of the selected block, 3: Total number of sibling blocks of the same type */
    __('%1$s (%2$d of %3$d)'),
    blockProps['aria-label'],
    currentColumnPosition,
    columnsCount,
  );

  const innerBlockProps = useInnerBlocksProps(
    {
      ...blockProps,
      'aria-label': label,
    },
    {
      templateLock: attributes.templateLock,
      renderAppender: hasChildBlocks
        ? undefined
        : InnerBlocks.ButtonBlockAppender,
    },
  );

  return (
    <>
      <BlockControls></BlockControls>
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
      <div {...innerBlockProps} />
    </>
  );
}
