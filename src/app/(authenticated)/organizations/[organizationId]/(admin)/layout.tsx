import { ReactNode } from 'react';
import { getAdminOrRedirect } from '@/features/auth/queries/get-admin-or-redirect';

type AdminLayoutProps = {
  children: ReactNode;
  params: Promise<{ organizationId: string }>;
};

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { organizationId } = await params;
  await getAdminOrRedirect(organizationId);

  return <>{children}</>;
}
