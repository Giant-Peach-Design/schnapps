import {
  InspectorControls,
  BlockControls,
  useBlockProps,
  useInnerBlocksProps,
  store as blockEditorStore,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

function ColumnsEdit({ attributes, setAttributes, clientId }) {
  const { count } = useSelect((select) => {
    const { canInsertBlockType, canRemoveBlock, getBlocks, getBlockCount } =
      select(blockEditorStore);
    const innerBlocks = getBlocks(clientId);
    console.log(innerBlocks);

    // Get the indexes of columns for which removal is prevented.
    // The highest index will be used to determine the minimum column count.
    const preventRemovalBlockIndexes = innerBlocks.reduce(
      (acc, block, index) => {
        if (!canRemoveBlock(block.clientId)) {
          acc.push(index);
        }
        return acc;
      },
      [],
    );

    return {
      count: getBlockCount(clientId),
      canInsertColumnBlock: canInsertBlockType('core/column', clientId),
      minCount: Math.max(...preventRemovalBlockIndexes) + 1,
    };
  });

  const blockProps = useBlockProps();
  const innerBlockProps = useInnerBlocksProps(blockProps, {
    allowedBlocks: ['giantpeach/column'],
  });

  return (
    <>
      <BlockControls></BlockControls>
      <InspectorControls></InspectorControls>
      <div {...innerBlockProps} />
    </>
  );
}

export default ColumnsEdit;
