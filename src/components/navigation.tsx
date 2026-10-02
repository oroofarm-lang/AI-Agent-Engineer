'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Settings2,
  Terminal,
  GitBranch,
  FolderCode,
  Flag,
  NotebookPen,
  Bug,
} from 'lucide-react';
import { he } from '@/lib/i18n/he';
const routes = [
  { href: '/', label: he.dashboard, icon: LayoutDashboard },
  { href: '/learn', label: he.learn, icon: BookOpen },
  { href: '/topics', label: 'פרקי הקורס', icon: FolderCode },
  { href: '/skills', label: 'עץ מיומנויות', icon: GitBranch },
  { href: '/assessments', label: 'העבודות והמשוב שלי', icon: NotebookPen },
  { href: '/portfolio', label: 'תיק העבודות שלי', icon: FolderCode },
  { href: '/projects', label: 'פרויקטים', icon: FolderCode },
  { href: '/boss', label: 'מבחנים מסכמים', icon: Flag },
  { href: '/journal', label: 'יומן הלמידה', icon: NotebookPen },
  { href: '/failures', label: 'תקלות ובדיקות', icon: Bug },
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
