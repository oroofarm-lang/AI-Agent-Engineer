'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Settings2,
  Route,
  Terminal,
  GitBranch,
  FolderCode,
  Flag,
  NotebookPen,
  Bug,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { he } from '@/lib/i18n/he';
const routes = [
  { href: '/', label: he.dashboard, icon: LayoutDashboard },
  { href: '/learn', label: he.learn, icon: BookOpen },
  { href: '/topics', label: 'ספריית פרקים', icon: FolderCode },
  { href: '/skills', label: 'עץ מיומנויות', icon: GitBranch },
  { href: '/assessments', label: 'תיק ראיות', icon: NotebookPen },
  { href: '/projects', label: 'פרויקטים', icon: FolderCode },
  { href: '/boss', label: 'מבחנים מסכמים', icon: Flag },
  { href: '/journal', label: 'יומן הלמידה', icon: NotebookPen },
  { href: '/failures', label: 'תקלות ובדיקות', icon: Bug },
  { href: '/roadmap', label: he.roadmap, icon: Route },
  { href: '/settings', label: he.settings, icon: Settings2 },
];
export function Navigation() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/" className="brand" aria-label="AI Agent Engineer — דף הבית">
        <span className="brand-mark">
          <Terminal size={23} />
        </span>
        <span dir="ltr">
          AGENT ENGINEER<small>PERSONAL LEARNING OS</small>
        </span>
      </Link>
      <div className="workspace-label">
        <span className="status-dot" /> מרחב למידה אישי <span className="local-label">ACCOUNT</span>
      </div>
      <nav aria-label="ניווט ראשי">
        {routes.map(({ href, label, icon: Icon }) => (
          <Link
            href={href}
            key={href}
            aria-current={
              (href === '/' ? pathname === '/' : pathname.startsWith(href)) ? 'page' : undefined
            }
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="sidebar-upcoming">
        <div className="eyebrow">בהמשך הפיתוח</div>
        {[
          { label: 'מה חדש', icon: Sparkles },
          { label: 'בריאות תוכנית הלימוד', icon: ShieldCheck },
        ].map(({ label, icon: Icon }) => (
          <div className="upcoming-row" key={label}>
            <Icon size={17} />
            <span>{label}</span>
            <span className="tiny">מתוכנן</span>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="avatar">א</div>
        <div>
          המרחב שלך<small>התקדמות לפי חשבון</small>
        </div>
        <span className="status-dot" />
      </div>
    </aside>
  );
}
