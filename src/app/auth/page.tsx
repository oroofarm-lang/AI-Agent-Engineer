import { AuthForm } from '@/components/auth-form';
import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { mailConfigured } from '@/lib/mail/delivery';
export const metadata = { title: 'כניסה לחשבון' };
export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  if (await getSession()) redirect('/');
  const { token } = await searchParams;
  return (
    <div className="page auth-page">
      <AuthForm resetToken={token} mailEnabled={mailConfigured()} />
    </div>
  );
}
