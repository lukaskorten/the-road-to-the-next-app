import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import ActiveOrganizationBar from '@/features/organizations/components/active-organization-bar';

export default async function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuthOrRedirect();

  return (
    <>
      {children}
      <ActiveOrganizationBar />
    </>
  );
}
