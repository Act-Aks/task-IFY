import { Plus } from 'lucide-react'

import { FormPopover } from '@/components/Form/FormPopover'
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
        <FormPopover align='start' side='bottom' sideOffset={16}>
          <Button
            size={'sm'}
            variant={'primary-gradient'}
            className='rounded-sm hidden md:block h-auto py-1.5 px-2'
            asChild>
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <div className='block bg-gradient-to-r from-fuchsia-600 to-violet-600 text-primary-foreground hover:bg-gradient-to-r hover:from-fuchsia-700 hover:to-violet-700 rounded-sm px-3 py-2.5 justify-center items-center'>
            <Plus className='w-4 h-4' />
          </div>
        </FormPopover>
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
