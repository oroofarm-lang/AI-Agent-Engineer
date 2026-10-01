import { TopicCatalog } from '@/components/topic-catalog';
import { getCurriculum, getRepository } from '@/lib/data';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'ספריית פרקים' };
export default async function Topics() {
  const curriculum = getCurriculum();
  const progress = (await getRepository()).progress();
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">CHOOSE YOUR PATH</p>
          <h1>מהיסודות לפתרונות עסקיים.</h1>
          <p className="muted">
            {curriculum.modules?.length} פרקים · {curriculum.lessons.length} יחידות · בחר התמחות
            אחרי פרק היסודות.
          </p>
        </div>
        <span className="version-tag" dir="ltr">
          v{curriculum.version}
        </span>
      </div>
      <div className="notice">
        לכל יחידה יש הסבר, משימת בנייה, מעבדת כשל, אתגר, מקורות ומחוון ראיות. רוב היחידות הן חוברות
        תרגול תמציתיות להעמקה עצמאית. זמינות התוכן אינה מעידה שכל דוגמת קוד או חיבור חיצוני נבדקו.
      </div>
      <TopicCatalog curriculum={curriculum} progress={progress} />
    </div>
  );
}
