import { Plus } from 'lucide-react'

import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { routes } from '@/constants'

import { MobileSidebar } from './MobileSidebar'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

export const Navbar = () => {
  return (
    <nav className='fixed px-4 z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center'>
      <MobileSidebar />

      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex'>
          <Logo />
        </div>
        <Button
          size={'sm'}
          variant={'primary-gradient'}
          className='rounded-sm hidden md:block h-auto py-1.5 px-2'>
          Create
        </Button>
        <Button size={'sm'} className='rounded-sm block md:hidden'>
          <Plus className='w-4 h-4' />
        </Button>
      </div>

      <div className='ml-auto flex items-center gap-x-2'>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={routes.organization}
          afterSelectOrganizationUrl={routes.organization}
          afterLeaveOrganizationUrl={routes.selectOrg}
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl={routes.home}
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  )
}
