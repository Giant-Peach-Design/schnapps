import editorLinks from "./editor-links";
import HeadingOverrides from "./Heading";
import TypographyOverrides from './Typography';
import ImageOverrides from './Image';

editorLinks();
HeadingOverrides();
TypographyOverrides();
ImageOverrides();

// Rich text toolbar
wp.domReady(function () {
  wp.richText.unregisterFormatType('core/image');
  wp.richText.unregisterFormatType('core/code');
  wp.richText.unregisterFormatType('core/keyboard');
  wp.richText.unregisterFormatType('core/footnote');
  wp.richText.unregisterFormatType('core/language');
});
