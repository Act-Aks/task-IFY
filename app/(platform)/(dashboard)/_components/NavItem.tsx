'use client'

import { Activity, CreditCard, Layout, Settings } from 'lucide-react'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, generateRoute } from '@/lib/utils'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

export type Organization = {
  id: string
  name: string
  slug: string
  imageUrl: string
}

interface NavItemProps {
  isActive: boolean
  isExpanded: boolean
  organization: Organization
  onExpand: (id: string) => void
}

export const NavItem = ({ isActive, isExpanded, organization, onExpand }: NavItemProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const navRoutes = [
    {
      label: 'Boards',
      icon: <Layout className='w-4 h-4 mr-2' />,
      href: generateRoute('organization', { id: organization.id }),
    },
    {
      label: 'Activity',
      icon: <Activity className='w-4 h-4 mr-2' />,
      href: generateRoute('activity', { id: organization.id }),
    },
    {
      label: 'Settings',
      icon: <Settings className='w-4 h-4 mr-2' />,
      href: generateRoute('settings', { id: organization.id }),
    },
    {
      label: 'Billing',
      icon: <CreditCard className='w-4 h-4 mr-2' />,
      href: generateRoute('billing', { id: organization.id }),
    },
  ]

  const onClick = (href: string) => {
    router.push(href)
  }

  return (
    <AccordionItem value={organization.id} className='border-none'>
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-gradient-to-r hover:from-fuchsia-200 hover:to-violet-200 transition text-start no-underline hover:no-underline hover:text-violet-700',
          isActive &&
            !isExpanded &&
            'bg-gradient-to-r from-fuchsia-700/10 to-violet-700/10 text-violet-700',
        )}>
        <div className='flex items-center gap-x-2'>
          <div className='w-7 h-7 relative'>
            <Image
              fill
              src={organization.imageUrl}
              alt='Organization'
              className='rounded-sm object-cover'
            />
          </div>
          <span className='font-medium text-sm'>{organization.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className='pt-1 text-neutral-700'>
        {navRoutes.map(route => (
          <Button
            key={route.href}
            size={'sm'}
            variant={'ghost'}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-1 hover:text-violet-700 transition',
              pathname === route.href &&
                'bg-gradient-to-r from-fuchsia-200 to-violet-200 text-violet-700',
            )}
            onClick={() => onClick(route.href)}>
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

NavItem.Skeleton = function NavItemSkeleton() {
  return (
    <div className='flex items-center gap-x-2'>
      <div className='w-10 h-10 relative shrink-0'>
        <Skeleton className='w-full h-full absolute' />
      </div>
      <Skeleton className='w-full h-10' />
    </div>
  )
}
