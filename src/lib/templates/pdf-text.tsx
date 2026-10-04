import type { PropsWithChildren } from 'react';
import { Text as PDFText, type TextProps } from '@react-pdf/renderer';

/** Renderer direction is not inherited. Set it on each text node, preserving explicit LTR code. */
export function TemplateText({ style, ...props }: PropsWithChildren<TextProps>) {
  const styles = Array.isArray(style) ? style : [style ?? {}];
  return <PDFText {...props} style={[{ direction: 'rtl' }, ...styles]} />;
}
