import { getOrganizations } from '../queries/get-organizations';

export default async function OrganizationList() {
  const organizations = await getOrganizations();
  return (
    <div>
      {organizations.map((organization) => (
        <div key={organization.id}>{organization.name}</div>
      ))}
    </div>
  );
}
