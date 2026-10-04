import Link from '@/components/workspace-navigation';
export default function NotFound() {
  return (
    <div className="page narrow">
      <p className="eyebrow">404</p>
      <h1>העמוד לא נמצא</h1>
      <p className="muted">אפשר לחזור למסלול ולבחור שיעור קיים.</p>
      <Link className="button primary" href="/learn">
        למסלול הלמידה
      </Link>
    </div>
  );
}
