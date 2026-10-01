import { AccessibilityMenu } from '@/components/accessibility/preferences';
import { RouteFocus } from '@/components/accessibility/route-focus';
import { LegalFooter } from '@/components/legal/footer';
import { legalDocuments } from '@/lib/legal';
import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import { ActivityHeader } from '@/components/learning/activity-header';
import './globals.css';
import './neon.css';
import '@fontsource/vt323/latin-400.css';
import './arcade.css';
import './cream.css';
import './connections.css';
import './accessibility.css';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: { default: 'Agent Engineer · סביבת הלמידה', template: '%s · Agent Engineer' },
  description: 'מערכת למידה אישית להנדסת סוכני AI. בונים, מבינים, שוברים, מתקנים ומוכיחים.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <a className="skip-link" href="#main">
          דלג לתוכן
        </a>
        <AccessibilityMenu />
        <RouteFocus />
        <Navigation />
        <div className="app-content">
          <ActivityHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <LegalFooter
            documents={legalDocuments()}
            operator={process.env.LEGAL_OPERATOR || 'Agent Engineer'}
          />
        </div>
      </body>
    </html>
  );
}
