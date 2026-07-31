import { format } from 'date-fns';
import { getOrganizationsByUser } from '../queries/get-organizations-by-user';

export default async function OrganizationList() {
  const organizations = await getOrganizationsByUser();
  return (
    <div className="animate-fade-from-top">
      {organizations.map((organization) => (
        <div key={organization.id}>
          <div>{organization.name}</div>
          <div>
            Joined At:{' '}
            {format(
              organization.membershipByUser.joinedAt,
              'dd MMM yyyy HH:mm'
            )}
          </div>
          <div>Members: {organization.membersCount}</div>
        </div>
      ))}
    </div>
  );
}
