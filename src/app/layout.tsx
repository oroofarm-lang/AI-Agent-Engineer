import { AccessibilityMenu } from '@/components/accessibility/preferences';
import { RouteFocus } from '@/components/accessibility/route-focus';
import { LegalFooter } from '@/components/legal/footer';
import { legalDocuments } from '@/lib/legal';
import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import { ActivityHeader } from '@/components/learning/activity-header';
import { WorkspaceNavigation } from '@/components/workspace-navigation';
import { MentorContext } from '@/components/learning/mentor-context';
import './globals.css';
import './neon.css';
import '@fontsource/vt323/latin-400.css';
import './arcade.css';
import './cream.css';
import './connections.css';
import './accessibility.css';
import './refinement.css';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: { default: 'Agent Engineer · סביבת הלמידה', template: '%s · Agent Engineer' },
  description: 'מערכת למידה אישית להנדסת סוכני AI. בונים, מבינים, שוברים, מתקנים ומוכיחים.',
  ...(process.env.DEMO_MODE === 'true' ? { robots: { index: false, follow: false } } : {}),
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <a className="skip-link" href="#main">
          דלג לתוכן
        </a>
        <WorkspaceNavigation>
          <MentorContext>
            <AccessibilityMenu />
            <RouteFocus />
            <Navigation />
            <div className="app-content">
              {process.env.DEMO_MODE === 'true' && (
                <aside
                  aria-label="גרסת ניסיון"
                  style={{
                    padding: '16px',
                    border: '2px solid #756d59',
                    background: '#f5ebc9',
                    color: '#51431d',
                    lineHeight: 1.8,
                  }}
                >
                  <strong>גרסת ניסיון</strong> · החשבונות, ההתקדמות והקבצים בגרסה הזו עשויים להתאפס
                  כאשר השרת מופעל מחדש. אין להעלות מידע אישי או קבצים חשובים.
                </aside>
              )}
              <ActivityHeader />
              <main id="main" tabIndex={-1}>
                {children}
              </main>
              <LegalFooter
                documents={legalDocuments()}
                operator={process.env.LEGAL_OPERATOR || 'Agent Engineer'}
              />
            </div>
          </MentorContext>
        </WorkspaceNavigation>
      </body>
    </html>
  );
}
