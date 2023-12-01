import { routes } from '@/constants'

import { OrganizationList } from '@clerk/nextjs'

export default function SelectOrganization() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={routes.organization}
      afterCreateOrganizationUrl={routes.organization}
    />
  )
}
