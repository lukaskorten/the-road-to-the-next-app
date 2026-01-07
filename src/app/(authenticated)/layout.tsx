import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';

export default async function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getAuthOrRedirect();
  return <>{children}</>;
}
