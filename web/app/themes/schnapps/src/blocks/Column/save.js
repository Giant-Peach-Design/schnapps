/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
  const widthClasses = [
    'lg:w-1/12',
    'lg:w-2/12',
    'lg:w-3/12',
    'lg:w-4/12',
    'lg:w-5/12',
    'lg:w-6/12',
    'lg:w-7/12',
    'lg:w-8/12',
    'lg:w-9/12',
    'lg:w-10/12',
    'lg:w-11/12',
    'lg:w-12/12',
  ];

  const tabletWidthClasses = [
    'sm:w-1/12',
    'sm:w-2/12',
    'sm:w-3/12',
    'sm:w-4/12',
    'sm:w-5/12',
    'sm:w-6/12',
    'sm:w-7/12',
    'sm:w-8/12',
    'sm:w-9/12',
    'sm:w-10/12',
    'sm:w-11/12',
    'sm:w-12/12',
  ];

  const mobileWidthClasses = ['w-4/12', 'w-6/12', 'w-8/12', 'w-full'];

  const blockProps = useBlockProps.save({
    className: `px-4 ${widthClasses[attributes.columnWidth - 1]} ${
      tabletWidthClasses[attributes.tabletColumnWidth - 1]
    } ${mobileWidthClasses[attributes.mobileColumnWidth - 1]}`,
  });
  const innerBlockProps = useInnerBlocksProps.save(blockProps);
  return <div {...innerBlockProps} />;
}
