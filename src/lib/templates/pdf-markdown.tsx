import { Fragment, type ReactNode } from 'react';
import { View } from '@react-pdf/renderer';
import { TemplateText as Text } from './pdf-text';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type { Root, RootContent, PhrasingContent, ListItem, TableRow, TableCell } from 'mdast';

type Node = Root | RootContent | PhrasingContent | ListItem | TableRow | TableCell;
const children = (node: Node): ReactNode[] =>
  'children' in node
    ? node.children.map((child, i) => <Fragment key={i}>{render(child)}</Fragment>)
    : [];

/** Same inert content policy as the editor: no raw HTML, fetched images or active links. */
function render(node: Node): ReactNode {
  switch (node.type) {
    case 'root':
      return children(node);
    case 'text':
      return node.value;
    case 'paragraph':
      return <Text style={{ marginBottom: 8 }}>{children(node)}</Text>;
    case 'heading':
      return (
        <Text style={{ fontWeight: 700, fontSize: Math.max(12, 20 - node.depth), marginBottom: 8 }}>
          {children(node)}
        </Text>
      );
    case 'strong':
      return <Text style={{ fontWeight: 700 }}>{children(node)}</Text>;
    case 'emphasis':
      return <Text style={{ textDecoration: 'underline' }}>{children(node)}</Text>;
    case 'delete':
      return <Text style={{ textDecoration: 'line-through' }}>{children(node)}</Text>;
    case 'inlineCode':
      return <Text style={{ direction: 'ltr', backgroundColor: '#eeeeee' }}>{node.value}</Text>;
    case 'code':
      return (
        <Text
          style={{
            direction: 'ltr',
            textAlign: 'left',
            fontSize: 10,
            marginBottom: 10,
            padding: 8,
            backgroundColor: '#eeeeee',
          }}
        >
          {node.value}
        </Text>
      );
    case 'break':
      return '\n';
    case 'link':
    case 'linkReference':
      return children(node);
    case 'image':
    case 'imageReference':
      return node.alt || 'תמונה';
    case 'list':
      return (
        <View style={{ marginBottom: 8 }}>
          {node.children.map((item, index) => {
            const marker = `${node.ordered ? `${(node.start ?? 1) + index}.` : '•'}${item.checked === null || item.checked === undefined ? '' : item.checked ? ' [x]' : ' [ ]'} `;
            const [first, ...rest] = item.children;
            return (
              <View key={index} style={{ paddingRight: 12 }}>
                {first?.type === 'paragraph' ? (
                  <Text style={{ marginBottom: 8 }}>
                    {marker}
                    {children(first)}
                  </Text>
                ) : (
                  <>
                    {<Text>{marker}</Text>}
                    {first && render(first)}
                  </>
                )}
                {rest.map((child, i) => (
                  <Fragment key={i}>{render(child)}</Fragment>
                ))}
              </View>
            );
          })}
        </View>
      );
    case 'blockquote':
      return (
        <View
          style={{ borderRightWidth: 2, borderColor: '#777777', paddingRight: 10, marginBottom: 8 }}
        >
          {children(node)}
        </View>
      );
    case 'table':
      return (
        <View>
          {node.children.map((row, index) => (
            <View
              key={index}
              style={{ borderBottomWidth: 1, borderColor: '#777777', marginBottom: 8 }}
            >
              {row.children.map((cell, column) => (
                <Text key={column} style={{ marginBottom: 4 }}>
                  {index > 0 && (
                    <Text style={{ fontWeight: 700 }}>
                      {children(node.children[0].children[column])}
                      {': '}
                    </Text>
                  )}
                  {children(cell)}
                </Text>
              ))}
            </View>
          ))}
        </View>
      );
    case 'thematicBreak':
      return <View style={{ borderBottomWidth: 1, borderColor: '#777777', marginBottom: 10 }} />;
    case 'html':
    case 'definition':
      return null;
    default:
      return 'children' in node ? children(node) : null;
  }
}
export function PDFMarkdown({ text }: { text: string }) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(text);
  return <View>{render(tree)}</View>;
}
