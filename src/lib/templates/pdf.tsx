import { Fragment } from 'react';
import { Document, Font, Page, View, pdf } from '@react-pdf/renderer';
import { TemplateText as Text } from './pdf-text';
import { PDFMarkdown } from './pdf-markdown';
import { validateTemplateDocument, type TemplateDefinition } from './schema';

Font.register({
  family: 'TemplateHebrew',
  fonts: [
    { src: '/fonts/template-pdf/hebrew.woff' },
    { src: '/fonts/template-pdf/hebrew-bold.woff', fontWeight: 700 },
  ],
});
Font.register({
  family: 'TemplateLatin',
  fonts: [
    { src: '/fonts/template-pdf/latin.woff' },
    { src: '/fonts/template-pdf/latin-bold.woff', fontWeight: 700 },
  ],
});
Font.registerHyphenationCallback((word) => [word]);
const textStyle = {
  fontFamily: ['TemplateHebrew', 'TemplateLatin'],
  fontSize: 11,
  lineHeight: 1.5,
  direction: 'rtl' as const,
  textAlign: 'right' as const,
};

/** Local-only export of the validated buffer; no persistence or assessment claim. */
export async function exportTemplatePDF(raw: unknown, definition: TemplateDefinition) {
  const document = validateTemplateDocument(raw, definition);
  return pdf(
    <Document title={`עבודה — ${definition.lessonId}`} language="he">
      <Page
        size="A4"
        style={{ padding: 36, ...textStyle }}
        layout={({ children, pageNumber, totalPages }) => (
          <>
            <View style={{ flexGrow: 1 }}>{children}</View>
            <Text
              style={{
                height: 14,
                marginTop: 12,
                lineHeight: 1,
                fontFamily: 'Helvetica',
                fontSize: 9,
                textAlign: 'center',
                direction: 'ltr',
              }}
            >
              {`${pageNumber ?? ''} / ${totalPages ?? ''}`}
            </Text>
          </>
        )}
      >
        <Text style={{ fontSize: 18, marginBottom: 12 }}>העבודה שלי</Text>
        <Text style={{ direction: 'ltr', textAlign: 'left', marginBottom: 12 }}>
          {definition.id}
        </Text>
        <Text style={{ marginBottom: 16 }}>{definition.prompt}</Text>
        {document.table?.rows.map((row, index) => (
          <View
            key={index}
            style={{ marginBottom: 14, padding: 8, borderWidth: 1, borderColor: '#777777' }}
          >
            <Text style={{ marginBottom: 6 }}>שורה {index + 1}</Text>
            {row.map((value, column) => (
              <Fragment key={column}>
                <Text style={{ color: '#33554a' }}>{document.table!.columns[column].label}</Text>
                <Text style={{ marginBottom: 6 }}>{value || '—'}</Text>
              </Fragment>
            ))}
          </View>
        ))}
        <Text style={{ fontSize: 14, marginBottom: 8 }}>הסבר, תוצאות ומה למדתי</Text>
        <PDFMarkdown text={document.notes} />
      </Page>
    </Document>,
  ).toBlob();
}
